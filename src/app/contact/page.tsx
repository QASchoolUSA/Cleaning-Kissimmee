import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Cleaning Kissimmee for quotes, bookings, and service questions across Kissimmee and nearby areas.",
};

export default function ContactPage() {
  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
          Contact
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          Let&apos;s get your space on the calendar
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Reach out anytime during business hours—or skip the phone tag and use
          our online quote or booking flow.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <a
            href={site.phoneHref}
            className="rounded-2xl border border-line bg-white p-6 transition hover:border-fresh"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Phone
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-ink">
              {site.phone}
            </p>
            <p className="mt-2 text-sm text-muted">{site.hours}</p>
          </a>
          <a
            href={site.emailHref}
            className="rounded-2xl border border-line bg-white p-6 transition hover:border-fresh"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Email
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-ink break-all">
              {site.email}
            </p>
            <p className="mt-2 text-sm text-muted">We reply within one business day</p>
          </a>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Service area
            </p>
            <p className="mt-3 font-display text-2xl font-semibold text-ink">
              {site.address}
            </p>
            <p className="mt-2 text-sm text-muted">{site.serviceArea}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/book">Book online</Button>
          <Button href="/quote" variant="secondary">
            Request a free quote
          </Button>
        </div>
      </div>
    </div>
  );
}
