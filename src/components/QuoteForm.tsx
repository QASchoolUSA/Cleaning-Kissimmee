"use client";

import { FormEvent, useMemo, useState } from "react";
import { ChipSelect } from "@/components/ChipSelect";
import { services } from "@/lib/services";
import {
  bathroomCount,
  bedroomCount,
  DEFAULT_PRICING_CONFIG,
  estimateQuote,
  formatMoney,
  squareFeetCount,
  startingAtLabel,
  type PricingConfig,
} from "@/lib/pricing";
import { site } from "@/lib/site";

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
  service: "residential-cleaning",
  propertyType: "Home",
  bedrooms: "3",
  bathrooms: "2",
  sqft: "",
  frequency: "One-time",
  details: "",
};

const stepTitles = ["Your home", "Estimate", "Send quote"];

export function QuoteForm({
  defaultService = "",
  config = DEFAULT_PRICING_CONFIG,
}: {
  defaultService?: string;
  config?: PricingConfig;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    ...initial,
    service: defaultService || initial.service,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const estimate = useMemo(
    () =>
      estimateQuote(
        {
          service: form.service,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          frequency: form.frequency,
          sqft: form.sqft,
        },
        config,
      ),
    [
      form.service,
      form.bedrooms,
      form.bathrooms,
      form.frequency,
      form.sqft,
      config,
    ],
  );

  const serviceName = useMemo(
    () => services.find((s) => s.slug === form.service)?.name ?? form.service,
    [form.service],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function canContinue() {
    if (step === 1) return Boolean(form.service);
    if (step === 2) return Boolean(estimate);
    return Boolean(form.name && form.email && form.phone);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canContinue()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service_type: serviceName,
          notes: form.details.trim() || undefined,
          // This form prices the job but never asks when or where, so the
          // manager follows up for the address and date.
          intent: "quote",
          property: {
            bedrooms: bedroomCount(form.bedrooms),
            bathrooms: bathroomCount(form.bathrooms),
            square_feet: squareFeetCount(form.sqft),
            home_type: form.propertyType,
          },
          quote: estimate
            ? {
                estimate: estimate.mid,
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
          data.message || "Unable to send your quote request. Please try again.",
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Unable to send your quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-fresh/30 bg-fresh-mist p-6 text-center sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh-deep">
          Quote request received
        </p>
        <h2 className="font-display mt-3 text-2xl font-semibold text-ink sm:text-3xl">
          Thanks, {form.name.split(" ")[0]}!
        </h2>
        {estimate ? (
          <p className="mt-3 text-lg font-semibold text-ink">
            Estimate {formatMoney(estimate.low)}–{formatMoney(estimate.high)}
          </p>
        ) : null}
        <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
          We&apos;ll confirm your {serviceName} quote at{" "}
          <strong className="text-ink">{form.email}</strong> within one business
          day.
        </p>
        <button
          type="button"
          className="mt-8 min-h-12 w-full rounded-2xl bg-ink px-6 text-sm font-semibold text-white sm:w-auto sm:rounded-full"
          onClick={() => {
            setSubmitted(false);
            setSubmitError(null);
            setStep(1);
            setForm({ ...initial, service: defaultService || initial.service });
          }}
        >
          Start another estimate
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow)]"
    >
      {/* Live estimate header — always visible */}
      <div className="border-b border-line bg-ink px-4 py-4 text-white sm:px-6 sm:py-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#9fddd5]">
              Instant estimate
            </p>
            <p className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              {estimate
                ? `${formatMoney(estimate.low)}–${formatMoney(estimate.high)}`
                : "—"}
            </p>
          </div>
          <p className="pb-1 text-right text-xs text-white/65">
            Step {step}/3
            <br />
            <span className="font-semibold text-white/90">{stepTitles[step - 1]}</span>
          </p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-colors ${
                n <= step ? "bg-fresh" : "bg-white/20"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.7rem] text-white/55">
          Final price confirmed after review · not a binding rate
        </p>
      </div>

      <div className="px-4 py-5 sm:px-6 sm:py-7">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <p className="label-field">Service</p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {services.map((service) => {
                  const selected = form.service === service.slug;
                  return (
                    <button
                      key={service.slug}
                      type="button"
                      onClick={() => update("service", service.slug)}
                      className={`min-h-14 shrink-0 rounded-2xl border px-4 py-3 text-left transition active:scale-[0.98] ${
                        selected
                          ? "border-fresh bg-fresh-mist"
                          : "border-line bg-white"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-ink">
                        {service.shortName}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        From {startingAtLabel(service.slug, config)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <ChipSelect
              label="Property type"
              value={form.propertyType}
              onChange={(v) => update("propertyType", v)}
              columns={2}
              options={[
                { value: "Home", label: "Home" },
                { value: "Condo / Townhome", label: "Condo" },
                { value: "Vacation rental", label: "Vacation rental" },
                { value: "Office", label: "Office" },
              ]}
            />

            <ChipSelect
              label="How often?"
              value={form.frequency}
              onChange={(v) => update("frequency", v)}
              columns={2}
              options={[
                { value: "One-time", label: "One-time" },
                { value: "Weekly", label: "Weekly", hint: "Best value" },
                { value: "Bi-weekly", label: "Bi-weekly" },
                { value: "Monthly", label: "Monthly" },
              ]}
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
              options={["Studio", "1", "2", "3", "4", "5+"].map((n) => ({
                value: n,
                label: n === "Studio" ? "Studio" : `${n}`,
              }))}
            />

            <ChipSelect
              label="Bathrooms"
              value={form.bathrooms}
              onChange={(v) => update("bathrooms", v)}
              columns={3}
              options={["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((n) => ({
                value: n,
                label: n,
              }))}
            />

            <div>
              <label className="label-field" htmlFor="q-sqft">
                Square footage{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="q-sqft"
                className="input-field min-h-12"
                value={form.sqft}
                onChange={(e) => update("sqft", e.target.value)}
                placeholder="e.g. 1,800"
                inputMode="numeric"
              />
            </div>

            {estimate ? (
              <div className="rounded-2xl bg-fresh-mist px-4 py-4">
                <p className="text-sm font-semibold text-ink">
                  {estimate.label}: {formatMoney(estimate.low)}–
                  {formatMoney(estimate.high)}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Based on {form.bedrooms} bed · {form.bathrooms} bath ·{" "}
                  {form.frequency.toLowerCase()}. Tap continue to send this for a
                  confirmed quote.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-paper px-4 py-3 text-sm text-muted">
              <p className="font-semibold text-ink">
                {estimate
                  ? `${formatMoney(estimate.low)}–${formatMoney(estimate.high)}`
                  : "Custom quote"}
              </p>
              <p className="mt-1">
                {serviceName} · {form.propertyType} · {form.bedrooms} bed /{" "}
                {form.bathrooms} bath · {form.frequency}
              </p>
            </div>
            <div>
              <label className="label-field" htmlFor="q-name">
                Full name
              </label>
              <input
                id="q-name"
                className="input-field min-h-12"
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
                className="input-field min-h-12"
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
                className="input-field min-h-12"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(689) 288-3488"
                required
                autoComplete="tel"
              />
            </div>
            <div>
              <label className="label-field" htmlFor="q-details">
                Notes <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="q-details"
                className="input-field min-h-24 resize-y"
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
                placeholder="Pets, access notes, must-clean areas…"
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

      {/* Sticky action bar on mobile */}
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
              Call instead
            </a>
          )}
          {step < 3 ? (
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => setStep((s) => s + 1)}
              className="min-h-12 flex-[1.4] rounded-2xl bg-fresh text-sm font-semibold text-white disabled:opacity-45 sm:flex-none sm:rounded-full sm:px-8"
            >
              {step === 1 ? "See estimate" : "Continue"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting || !canContinue()}
              className="min-h-12 flex-[1.6] rounded-2xl bg-ink text-sm font-semibold text-white disabled:opacity-70 sm:flex-none sm:rounded-full sm:px-8"
            >
              {submitting ? "Sending…" : "Send my quote"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
