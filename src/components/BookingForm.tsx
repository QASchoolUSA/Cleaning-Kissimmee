"use client";

import { FormEvent, useMemo, useState } from "react";
import { services } from "@/lib/services";

type BookingState = {
  service: string;
  date: string;
  time: string;
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
  address: "",
  city: "Kissimmee",
  zip: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

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

export function BookingForm({ defaultService = "" }: { defaultService?: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingState>({
    ...initial,
    service: defaultService,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  const serviceName = useMemo(
    () => services.find((s) => s.slug === form.service)?.name ?? "Cleaning",
    [form.service],
  );

  function update<K extends keyof BookingState>(key: K, value: BookingState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function canContinue() {
    if (step === 1) return Boolean(form.service && form.date && form.time);
    if (step === 2) return Boolean(form.address && form.city && form.zip);
    return Boolean(form.name && form.email && form.phone);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue()) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-fresh/30 bg-fresh-mist p-8 text-center sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh-deep">
          Booking requested
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-ink">
          You&apos;re on the calendar
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          {serviceName} on <strong className="text-ink">{form.date}</strong> at{" "}
          <strong className="text-ink">{form.time}</strong>. Confirmation details
          go to {form.email}.
        </p>
        <button
          type="button"
          className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
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
      className="rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow)] sm:p-8"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink">Book a cleaning</p>
          <p className="text-sm text-muted">Step {step} of 3</p>
        </div>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                n <= step ? "bg-fresh" : "bg-sky"
              }`}
            />
          ))}
        </div>
        <ol className="mt-4 hidden gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:flex">
          <li className={step === 1 ? "text-fresh" : ""}>Service & time</li>
          <li className={step === 2 ? "text-fresh" : ""}>Location</li>
          <li className={step === 3 ? "text-fresh" : ""}>Your details</li>
        </ol>
      </div>

      {step === 1 && (
        <div className="grid gap-4">
          <div>
            <p className="label-field">Choose a service</p>
            <div className="grid gap-2">
              {services.map((service) => {
                const selected = form.service === service.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => update("service", service.slug)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      selected
                        ? "border-fresh bg-fresh-mist"
                        : "border-line bg-white hover:border-fresh/50"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ink">
                      {service.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      From {service.startingAt} · {service.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field" htmlFor="b-date">
                Preferred date
              </label>
              <input
                id="b-date"
                type="date"
                min={minDate}
                className="input-field"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label-field" htmlFor="b-time">
                Arrival window start
              </label>
              <select
                id="b-time"
                className="input-field"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              >
                {times.map((time) => (
                  <option key={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-field" htmlFor="b-address">
              Street address
            </label>
            <input
              id="b-address"
              className="input-field"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123 Palm Parkway"
              required
              autoComplete="street-address"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="b-city">
              City
            </label>
            <input
              id="b-city"
              className="input-field"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              required
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="b-zip">
              ZIP code
            </label>
            <input
              id="b-zip"
              className="input-field"
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
              placeholder="34747"
              required
              autoComplete="postal-code"
              inputMode="numeric"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label-field" htmlFor="b-notes">
              Access notes (optional)
            </label>
            <textarea
              id="b-notes"
              className="input-field min-h-28 resize-y"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Gate code, parking, pets, or lockbox info"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-field" htmlFor="b-name">
              Full name
            </label>
            <input
              id="b-name"
              className="input-field"
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
              className="input-field"
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
              className="input-field"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
              autoComplete="tel"
            />
          </div>
          <div className="sm:col-span-2 rounded-xl bg-paper p-4 text-sm leading-relaxed text-muted">
            <p className="font-semibold text-ink">Booking summary</p>
            <p className="mt-2">
              {serviceName}
              <br />
              {form.date} · {form.time}
              <br />
              {form.address}, {form.city} {form.zip}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink-soft"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            type="button"
            disabled={!canContinue()}
            onClick={() => setStep((s) => s + 1)}
            className="rounded-full bg-fresh px-6 py-3 text-sm font-semibold text-white hover:bg-fresh-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting || !canContinue()}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft disabled:opacity-70"
          >
            {submitting ? "Booking…" : "Confirm booking"}
          </button>
        )}
      </div>
    </form>
  );
}
