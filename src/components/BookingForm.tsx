"use client";

import { FormEvent, useMemo, useState } from "react";
import { ChipSelect } from "@/components/ChipSelect";
import { services } from "@/lib/services";
import { estimateQuote, formatMoney } from "@/lib/pricing";
import { site } from "@/lib/site";

type BookingState = {
  service: string;
  date: string;
  time: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  frequency: string;
  address: string;
  city: string;
  zip: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const initial: BookingState = {
  service: "",
  date: "",
  time: "9:00 AM",
  bedrooms: "3",
  bathrooms: "2",
  sqft: "",
  frequency: "One-time",
  address: "",
  city: "Kissimmee",
  zip: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const BEDROOM_OPTIONS = ["Studio", "1", "2", "3", "4", "5+"];
const BATHROOM_OPTIONS = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];
const SQFT_OPTIONS = [
  "Under 1,000",
  "1,000–1,500",
  "1,500–2,500",
  "2,500–4,000",
  "4,000+",
  "Not sure",
];

/** Chips carry labels; these turn them into the numbers Booking Broom stores. */
function bedroomCount(value: string): number | undefined {
  if (value === "Studio") return 0;
  const parsed = Number(value.replace("+", ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function bathroomCount(value: string): number | undefined {
  const parsed = Number(value.replace("+", ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

const times = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

const stepTitles = ["Service & time", "Your home", "Location", "Your details"];
const TOTAL_STEPS = stepTitles.length;

export function BookingForm({ defaultService = "" }: { defaultService?: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingState>({
    ...initial,
    service: defaultService,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  const serviceName = useMemo(
    () => services.find((s) => s.slug === form.service)?.name ?? "Cleaning",
    [form.service],
  );

  const estimate = useMemo(
    () =>
      estimateQuote({
        service: form.service,
        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        frequency: form.frequency,
        sqft: form.sqft === "Not sure" ? "" : form.sqft,
      }),
    [form.service, form.bedrooms, form.bathrooms, form.frequency, form.sqft],
  );

  function update<K extends keyof BookingState>(key: K, value: BookingState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function canContinue() {
    if (step === 1) return Boolean(form.service && form.date && form.time);
    if (step === 2) return Boolean(form.bedrooms && form.bathrooms);
    if (step === 3) return Boolean(form.address && form.city && form.zip);
    return Boolean(form.name && form.email && form.phone);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fullAddress = [form.address, form.city, form.zip]
        .filter(Boolean)
        .join(", ");
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: fullAddress,
          service_type: serviceName,
          preferred_date: form.date,
          preferred_time: form.time,
          notes: form.notes.trim() || undefined,
          property: {
            bedrooms: bedroomCount(form.bedrooms),
            bathrooms: bathroomCount(form.bathrooms),
            size_label:
              form.sqft && form.sqft !== "Not sure"
                ? `${form.sqft} sq ft`
                : undefined,
          },
          quote: estimate
            ? {
                estimate_low: estimate.low,
                estimate_high: estimate.high,
                currency: "USD",
                frequency: form.frequency,
                payment_terms: "Due after cleaning is complete",
              }
            : undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || data.ok === false) {
        setSubmitError(
          data.message || "Unable to submit booking. Please try again.",
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Unable to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-fresh/30 bg-fresh-mist p-6 text-center sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh-deep">
          Booking requested
        </p>
        <h2 className="font-display mt-3 text-2xl font-semibold text-ink sm:text-3xl">
          You&apos;re on the calendar
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
          {serviceName} on <strong className="text-ink">{form.date}</strong> at{" "}
          <strong className="text-ink">{form.time}</strong>. Details go to{" "}
          {form.email}.
        </p>
        <button
          type="button"
          className="mt-8 min-h-12 w-full rounded-2xl bg-ink px-6 text-sm font-semibold text-white sm:w-auto sm:rounded-full"
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setForm({ ...initial, service: defaultService });
          }}
        >
          Book another visit
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow)]"
    >
      <div className="border-b border-line bg-paper px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink">Book a cleaning</p>
          <p className="text-xs font-semibold text-muted">
            {step}/{TOTAL_STEPS} · {stepTitles[step - 1]}
          </p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-colors ${
                n <= step ? "bg-fresh" : "bg-sky"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-7">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <p className="label-field">Choose a service</p>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => {
                  const selected = form.service === service.slug;
                  return (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => update("service", service.slug)}
                      className={`min-h-[4.5rem] rounded-2xl border px-3 py-3 text-left transition active:scale-[0.98] ${
                        selected
                          ? "border-fresh bg-fresh-mist"
                          : "border-line bg-white"
                      }`}
                    >
                      <span className="block text-[0.8rem] font-semibold leading-snug text-ink sm:text-sm">
                        {service.shortName}
                      </span>
                      <span className="mt-1 block text-[0.7rem] text-muted">
                        From {service.startingAt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="label-field" htmlFor="b-date">
                Preferred date
              </label>
              <input
                id="b-date"
                type="date"
                min={minDate}
                className="input-field min-h-12"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
              />
            </div>

            <ChipSelect
              label="Arrival time"
              value={form.time}
              onChange={(v) => update("time", v)}
              columns={2}
              options={times.map((time) => ({
                value: time,
                label: time,
              }))}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <ChipSelect
              label="Bedrooms"
              value={form.bedrooms}
              onChange={(v) => update("bedrooms", v)}
              columns={3}
              options={BEDROOM_OPTIONS.map((n) => ({ value: n, label: n }))}
            />

            <ChipSelect
              label="Bathrooms"
              value={form.bathrooms}
              onChange={(v) => update("bathrooms", v)}
              columns={4}
              options={BATHROOM_OPTIONS.map((n) => ({ value: n, label: n }))}
            />

            <ChipSelect
              label="Square footage (optional)"
              value={form.sqft}
              onChange={(v) => update("sqft", v)}
              columns={3}
              options={SQFT_OPTIONS.map((n) => ({ value: n, label: n }))}
            />

            <ChipSelect
              label="How often?"
              value={form.frequency}
              onChange={(v) => update("frequency", v)}
              columns={4}
              options={["One-time", "Weekly", "Bi-weekly", "Monthly"].map((n) => ({
                value: n,
                label: n,
              }))}
            />

            {estimate ? (
              <div className="rounded-2xl border border-fresh/30 bg-fresh-mist px-4 py-3">
                <p className="text-sm font-semibold text-fresh-deep">
                  Estimated {formatMoney(estimate.low)}–{formatMoney(estimate.high)}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Based on {form.bedrooms} bed · {form.bathrooms} bath ·{" "}
                  {form.frequency.toLowerCase()}. We confirm the final price before we
                  start.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="label-field" htmlFor="b-address">
                Street address
              </label>
              <input
                id="b-address"
                className="input-field min-h-12"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="123 Palm Parkway"
                required
                autoComplete="street-address"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-field" htmlFor="b-city">
                  City
                </label>
                <input
                  id="b-city"
                  className="input-field min-h-12"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  required
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <label className="label-field" htmlFor="b-zip">
                  ZIP
                </label>
                <input
                  id="b-zip"
                  className="input-field min-h-12"
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  placeholder="34747"
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                />
              </div>
            </div>
            <div>
              <label className="label-field" htmlFor="b-notes">
                Access notes{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="b-notes"
                className="input-field min-h-24 resize-y"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Gate code, parking, pets, lockbox…"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-paper px-4 py-3 text-sm leading-relaxed text-muted">
              <p className="font-semibold text-ink">Booking summary</p>
              <p className="mt-1">
                {serviceName}
                {estimate
                  ? ` · ${formatMoney(estimate.low)}–${formatMoney(estimate.high)}`
                  : ""}
                <br />
                {form.bedrooms} bed · {form.bathrooms} bath · {form.frequency}
                <br />
                {form.date} · {form.time}
                <br />
                {form.address}, {form.city} {form.zip}
              </p>
            </div>
            <div>
              <label className="label-field" htmlFor="b-name">
                Full name
              </label>
              <input
                id="b-name"
                className="input-field min-h-12"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label className="label-field" htmlFor="b-email">
                Email
              </label>
              <input
                id="b-email"
                type="email"
                className="input-field min-h-12"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label-field" htmlFor="b-phone">
                Phone
              </label>
              <input
                id="b-phone"
                type="tel"
                className="input-field min-h-12"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
                autoComplete="tel"
              />
            </div>
            {submitError && (
              <p className="text-sm font-semibold text-red-700" role="alert">
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md sm:static sm:bg-white sm:px-6 sm:py-5 sm:backdrop-blur-none">
        <div className="flex gap-2.5">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="min-h-12 flex-1 rounded-2xl border border-line text-sm font-semibold text-ink-soft sm:flex-none sm:rounded-full sm:px-6"
            >
              Back
            </button>
          ) : (
            <a
              href={site.phoneHref}
              className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-line text-sm font-semibold text-ink-soft sm:hidden"
            >
              Call us
            </a>
          )}
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep((s) => s + 1)}
              className="min-h-12 flex-[1.4] rounded-2xl bg-fresh text-sm font-semibold text-white disabled:opacity-45 sm:flex-none sm:rounded-full sm:px-8"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || !canContinue()}
              className="min-h-12 flex-[1.6] rounded-2xl bg-ink text-sm font-semibold text-white disabled:opacity-70 sm:flex-none sm:rounded-full sm:px-8"
            >
              {submitting ? "Booking…" : "Confirm booking"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
