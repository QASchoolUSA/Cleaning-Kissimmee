"use client";

import { FormEvent, useMemo, useState } from "react";
import { services } from "@/lib/services";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  frequency: string;
  details: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  propertyType: "Home",
  bedrooms: "3",
  bathrooms: "2",
  sqft: "",
  frequency: "One-time",
  details: "",
};

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    ...initial,
    service: defaultService,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const serviceName = useMemo(
    () => services.find((s) => s.slug === form.service)?.name ?? form.service,
    [form.service],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step === 1 && (!form.name || !form.email || !form.phone)) return;
    if (step === 2 && !form.service) return;
    setStep((s) => Math.min(3, s + 1));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-fresh/30 bg-fresh-mist p-8 text-center sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh-deep">
          Quote request received
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-ink">
          Thanks, {form.name.split(" ")[0]}!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          We&apos;ll review your {serviceName || "cleaning"} details and email a
          free quote to <strong className="text-ink">{form.email}</strong> within
          one business day.
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
          Submit another request
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
          <p className="text-sm font-semibold text-ink">Free quote</p>
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
      </div>

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-field" htmlFor="q-name">
              Full name
            </label>
            <input
              id="q-name"
              className="input-field"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Alex Rivera"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="q-email">
              Email
            </label>
            <input
              id="q-email"
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label-field" htmlFor="q-phone">
              Phone
            </label>
            <input
              id="q-phone"
              type="tel"
              className="input-field"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(407) 555-0142"
              required
              autoComplete="tel"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label-field" htmlFor="q-service">
              Service needed
            </label>
            <select
              id="q-service"
              className="input-field"
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="q-property">
              Property type
            </label>
            <select
              id="q-property"
              className="input-field"
              value={form.propertyType}
              onChange={(e) => update("propertyType", e.target.value)}
            >
              <option>Home</option>
              <option>Condo / Townhome</option>
              <option>Vacation rental</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="q-frequency">
              Frequency
            </label>
            <select
              id="q-frequency"
              className="input-field"
              value={form.frequency}
              onChange={(e) => update("frequency", e.target.value)}
            >
              <option>One-time</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="q-beds">
              Bedrooms
            </label>
            <select
              id="q-beds"
              className="input-field"
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", e.target.value)}
            >
              {["Studio", "1", "2", "3", "4", "5+"].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="q-baths">
              Bathrooms
            </label>
            <select
              id="q-baths"
              className="input-field"
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", e.target.value)}
            >
              {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label-field" htmlFor="q-sqft">
              Approx. square footage (optional)
            </label>
            <input
              id="q-sqft"
              className="input-field"
              value={form.sqft}
              onChange={(e) => update("sqft", e.target.value)}
              placeholder="1,800"
              inputMode="numeric"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4">
          <div>
            <label className="label-field" htmlFor="q-details">
              Anything we should know?
            </label>
            <textarea
              id="q-details"
              className="input-field min-h-36 resize-y"
              value={form.details}
              onChange={(e) => update("details", e.target.value)}
              placeholder="Pets, access instructions, must-clean areas, preferred timing…"
            />
          </div>
          <div className="rounded-xl bg-paper p-4 text-sm text-muted">
            <p>
              <span className="font-semibold text-ink">Summary:</span>{" "}
              {serviceName || "Service"} · {form.propertyType} ·{" "}
              {form.bedrooms} bed / {form.bathrooms} bath · {form.frequency}
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
            onClick={next}
            className="rounded-full bg-fresh px-6 py-3 text-sm font-semibold text-white hover:bg-fresh-deep"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft disabled:opacity-70"
          >
            {submitting ? "Sending…" : "Get my free quote"}
          </button>
        )}
      </div>
    </form>
  );
}
