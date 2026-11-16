import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { getPricingConfig } from "@/lib/pricing-config";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{ service?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await searchParams;
  const service = serviceSlug ? getService(serviceSlug) : undefined;

  if (service) {
    return {
      title: `${service.name} Price Calculator`,
      description: `Get an instant ${service.name.toLowerCase()} estimate and request a free confirmed quote from Cleaning Kissimmee.`,
      alternates: { canonical: `${site.url}/quote` },
    };
  }

  return {
    title: "Price Calculator",
    description:
      "Get an instant cleaning estimate and request a free confirmed quote from Cleaning Kissimmee.",
    alternates: { canonical: `${site.url}/quote` },
  };
}

const faqs = [
  {
    q: "Is the calculator estimate final?",
    a: "It is a planning range based on service, size, and frequency. We confirm the quote after reviewing access notes and any add-ons you request.",
  },
  {
    q: "Which service should I select?",
    a: "Use residential for routine visits, deep cleaning for a thorough reset, and vacation-rental or commercial options when turnover timing or business hours matter.",
  },
  {
    q: "Can I book right after quoting?",
    a: "Yes. Send the estimate for confirmation, or move to online booking when you are ready to pick a day and share entry details.",
  },
] as const;

export default async function QuotePage({ searchParams }: PageProps) {
  const { service = "" } = await searchParams;
  const config = await getPricingConfig();
  const selected = service ? getService(service) : undefined;

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="order-2 lg:order-1 lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
            Price calculator
          </p>
          <h1 className="font-display mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:mt-3 sm:text-5xl">
            {selected
              ? `${selected.shortName} estimate in seconds`
              : "See your estimate in seconds"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
            Tap your home details, watch the range update, then send it for a
            confirmed quote—no pressure. Unsure which scope fits? Compare{" "}
            <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
              cleaning services
            </Link>{" "}
            or read our{" "}
            <Link href="/guides" className="font-semibold text-fresh hover:text-fresh-deep">
              Kissimmee guides
            </Link>
            .
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
              Prefer to talk? Call {site.phone} or{" "}
              <Link href="/contact" className="font-semibold text-fresh hover:text-fresh-deep">
                contact us
              </Link>
            </li>
          </ul>

          <section className="mt-8 hidden space-y-4 text-sm leading-relaxed text-muted sm:block">
            <h2 className="font-display text-xl font-semibold text-ink">
              How quoting works
            </h2>
            <p>
              The calculator turns service type, bedrooms, bathrooms, and visit
              frequency into a transparent range for Kissimmee-area homes and
              rentals. Recurring plans usually lower the per-visit cost; deep
              cleans and turnovers take longer because the checklist covers
              baseboards, fixtures, and harder-to-reach detail work.
            </p>
            <p>
              When the range looks right, send it for a confirmed quote or{" "}
              <Link href="/book" className="font-semibold text-fresh hover:text-fresh-deep">
                book a cleaning
              </Link>{" "}
              with preferred dates. Need scope help first? Compare{" "}
              <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
                services
              </Link>{" "}
              across {site.serviceArea}.
            </p>
          </section>

          <section className="mt-8 hidden sm:block">
            <h2 className="font-display text-xl font-semibold text-ink">
              Quote FAQ
            </h2>
            <dl className="mt-4 space-y-5 text-sm">
              {faqs.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-ink">{item.q}</dt>
                  <dd className="mt-1.5 leading-relaxed text-muted">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        <div className="order-1 lg:order-2">
          <QuoteForm defaultService={service} config={config} />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl space-y-8 px-4 pb-12 sm:hidden">
        <section className="space-y-3 text-sm leading-relaxed text-muted">
          <h2 className="font-display text-lg font-semibold text-ink">
            How quoting works
          </h2>
          <p>
            Enter service, home size, and frequency for an instant planning
            range. We confirm the final quote after reviewing access notes and
            any add-ons—then you can book when you are ready.
          </p>
          <p>
            Or jump straight to{" "}
            <Link href="/book" className="font-semibold text-fresh">
              online booking
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Quote FAQ
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-ink">{item.q}</dt>
                <dd className="mt-1 leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}