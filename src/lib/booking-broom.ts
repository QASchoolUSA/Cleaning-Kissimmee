import { readEnv } from "@/lib/env";

/** Structured fields Booking Broom stores outside of the free-text notes. */
export type BookingBroomProperty = {
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  size_label?: string;
  home_type?: string;
  condition?: string;
  occupants?: number;
  last_cleaned?: string;
  excluded_areas?: string[];
};

export type BookingBroomQuote = {
  estimate?: number;
  estimate_low?: number;
  estimate_high?: number;
  currency?: string;
  service_level?: string;
  frequency?: string;
  add_ons?: { label: string; price?: number; quantity?: number }[];
  payment_terms?: string;
};

/** "quote" means the customer priced the job but did not ask to book it. */
export type BookingBroomIntent = "quote" | "book";

export type BookingBroomPayload = {
  customer_name: string;
  email?: string;
  phone?: string;
  address?: string;
  service_type?: string;
  preferred_date?: string;
  preferred_time?: string;
  notes?: string;
  intent?: BookingBroomIntent;
  property?: BookingBroomProperty;
  quote?: BookingBroomQuote;
};

export type BookingBroomResult = {
  ok: boolean;
  id?: string;
  message?: string;
};

function getConfig() {
  return {
    baseUrl: (
      readEnv("BOOKING_BROOM_URL") || "https://app.bookingbroom.com"
    ).replace(/\/$/, ""),
    apiKey: readEnv("BOOKING_BROOM_API_KEY") || "",
    siteSlug: readEnv("BOOKING_BROOM_SITE_SLUG") || "kissimmee",
  };
}

export async function createBooking(
  payload: BookingBroomPayload,
): Promise<BookingBroomResult> {
  const config = await getConfig();
  const idempotencyKey =
    `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const wirePayload: Record<string, unknown> = {
    ...payload,
    idempotency_key: idempotencyKey,
  };

  async function fallback(lastError: string): Promise<BookingBroomResult> {
    const { captureFailedBookingForward } = await import("@/lib/booking-outbox");
    const captured = await captureFailedBookingForward({
      payload: wirePayload,
      idempotencyKey,
      lastError,
    });
    if (captured.captured) {
      return {
        ok: true,
        degraded: true,
        fallback: captured.via,
        message: "Request received. We will confirm shortly.",
      };
    }
    return {
      ok: false,
      message: "Unable to submit booking. Please try again or call us.",
      error: captured.error || lastError,
    };
  }

  if (!config.apiKey) {
    console.error("[booking-broom] BOOKING_BROOM_API_KEY is not set");
    return fallback("Booking is not configured");
  }

  try {
    const res = await fetch(`${config.baseUrl}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        site_slug: config.siteSlug,
        api_key: config.apiKey,
        ...wirePayload,
      }),
    });

    if (!res.ok) {
      const responseText = await res.text().catch(() => "");
      let upstream = responseText.slice(0, 300);
      try {
        const parsed = JSON.parse(responseText) as { error?: string };
        if (parsed.error) upstream = parsed.error;
      } catch {
        // Keep raw body snippet.
      }
      console.error("[booking-broom] error", res.status, upstream);
      return fallback(upstream || `HTTP ${res.status}`);
    }

    const data = (await res.json().catch(() => ({}))) as {
      id?: string;
      booking_id?: string;
      message?: string;
    };

    return {
      ok: true,
      id: data.id || data.booking_id,
      message: data.message || "Booking received.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[booking-broom] forward error:", message);
    return fallback(message);
  }
}
