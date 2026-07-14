import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Quote",
  description:
    "Request a free cleaning quote from Cleaning Kissimmee. Fast, clear pricing for homes and vacation rentals.",
};

type PageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function QuotePage({ searchParams }: PageProps) {
  const { service = "" } = await searchParams;

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
            Free quote
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Know your price before we scrub a thing
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Three quick steps on mobile or desktop. We reply within one business
            day with a clear estimate—no pressure, no surprise fees.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-ink-soft">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-fresh" />
              Honest ranges based on size and condition
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
        <QuoteForm defaultService={service} />
      </div>
    </div>
  );
}
