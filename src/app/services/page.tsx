import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ServiceGrid } from "@/components/ServiceGrid";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Residential, deep clean, move-in/out, vacation rental, commercial, and recurring cleaning in Kissimmee, FL.",
};

export default function ServicesPage() {
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
          <ServiceGrid />
        </div>
        <div className="mt-16 flex flex-col gap-3 rounded-2xl bg-ink px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
