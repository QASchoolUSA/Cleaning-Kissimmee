import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ServiceGrid } from "@/components/ServiceGrid";
import { getPricingConfig } from "@/lib/pricing-config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Residential, deep clean, move-in/out, vacation rental, commercial, and recurring cleaning in Kissimmee, FL.",
  alternates: { canonical: `${site.url}/services` },
};

export default async function ServicesPage() {
  const config = await getPricingConfig();

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.2em] text-fresh">
          Services
        </p>
        <h1 className="animate-fade-up delay-1 font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          Cleaning built for Kissimmee living
        </h1>
        <p className="animate-fade-up delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Choose the service that matches your space. Every page outlines what
          we include, how long it takes, and where pricing starts.
        </p>
        <div className="mt-14">
          <ServiceGrid config={config} />
        </div>
        <div className="mt-16 rounded-2xl border border-line bg-white/80 px-6 py-8 sm:px-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Hosting a short-term rental?
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Pair{" "}
            <Link
              href="/services/vacation-rental-cleaning"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              vacation rental cleaning
            </Link>{" "}
            with our{" "}
            <Link
              href="/guides/airbnb-turnover-checklist-kissimmee"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              Airbnb turnover checklist
            </Link>
            , or browse{" "}
            <Link href="/guides" className="font-semibold text-fresh hover:text-fresh-deep">
              all guides
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-ink px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Not sure which service fits?
            </h2>
            <p className="mt-1 text-white/70">
              Tell us about your home and we&apos;ll recommend the right clean.
            </p>
          </div>
          <Button href="/quote" className="shrink-0">
            Get a free quote
          </Button>
        </div>
      </div>
    </div>
  );
}
