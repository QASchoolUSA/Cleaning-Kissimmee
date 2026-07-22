import { NextResponse } from "next/server";
import { createBooking } from "@/lib/booking-broom";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as {
      customer_name?: string;
      email?: string;
      phone?: string;
      address?: string;
      service_type?: string;
      preferred_date?: string;
      preferred_time?: string;
      notes?: string;
    };

    if (!json.customer_name?.trim()) {
      return NextResponse.json(
        { ok: false, message: "Name is required." },
        { status: 400 },
      );
    }

    const result = await createBooking({
      customer_name: json.customer_name.trim(),
      email: json.email?.trim(),
      phone: json.phone?.trim(),
      address: json.address?.trim(),
      service_type: json.service_type?.trim(),
      preferred_date: json.preferred_date?.trim(),
      preferred_time: json.preferred_time?.trim(),
      notes: json.notes?.trim(),
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message || "Booking failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: result.id,
      message: result.message,
    });
  } catch (error) {
    console.error("[api/bookings]", error);
    return NextResponse.json(
      { ok: false, message: "Unexpected server error" },
      { status: 500 },
    );
  }
}
