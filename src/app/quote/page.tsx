import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { getPricingConfig } from "@/lib/pricing-config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Price Calculator",
  description:
    "Get an instant cleaning estimate and request a free confirmed quote from Cleaning Kissimmee.",
};

type PageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function QuotePage({ searchParams }: PageProps) {
  const { service = "" } = await searchParams;
  const config = await getPricingConfig();

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        {/* Compact intro on mobile; fuller on desktop */}
        <div className="order-2 lg:order-1 lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
            Price calculator
          </p>
          <h1 className="font-display mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:mt-3 sm:text-5xl">
            See your estimate in seconds
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
            Tap your home details, watch the range update, then send it for a
            confirmed quote—no pressure.
          </p>
          <ul className="mt-4 hidden space-y-3 text-sm text-ink-soft sm:mt-8 sm:block">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-fresh" />
              Instant range based on size & frequency
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-fresh" />
              Recurring plans cost less per visit
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-fresh" />
              Prefer to talk? Call {site.phone}
            </li>
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <QuoteForm defaultService={service} config={config} />
        </div>
      </div>
    </div>
  );
}
