import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ServiceGrid } from "@/components/ServiceGrid";
import { getPricingConfig } from "@/lib/pricing-config";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Residential, deep clean, move-in/out, vacation rental, commercial, and recurring cleaning in Kissimmee, FL. Compare scopes and book the right clean.",
  alternates: { canonical: `${site.url}/services` },
};

const choosePaths = [
  {
    href: "/services/residential-cleaning",
    title: "Residential cleaning",
    text: "Everyday kitchens, baths, floors, and high-touch surfaces for busy households.",
  },
  {
    href: "/services/deep-cleaning",
    title: "Deep cleaning",
    text: "Seasonal or overdue resets—baseboards, fixtures, and hard-to-reach detail.",
  },
  {
    href: "/services/move-in-move-out",
    title: "Move-in / move-out",
    text: "Empty-home cleans for lease handoffs, sellers, and pre-furniture arrivals.",
  },
  {
    href: "/services/vacation-rental-cleaning",
    title: "Vacation rental cleaning",
    text: "Same-day Airbnb and short-term turnovers near the theme-park corridor.",
  },
  {
    href: "/services/commercial-cleaning",
    title: "Commercial cleaning",
    text: "Offices, clinics, and small storefronts on a schedule that fits operations.",
  },
  {
    href: "/services/recurring-cleaning",
    title: "Recurring cleaning",
    text: "Weekly or bi-weekly plans with a preferred day and consistent checklist.",
  },
] as const;

const faqs = [
  {
    q: "Which cleaning service should I book in Kissimmee?",
    a: "Choose residential or recurring for routine homes, deep cleaning for a thorough reset, move-in/out for empty properties, vacation rental cleaning for guest turnovers, and commercial for workplaces.",
  },
  {
    q: "Do you clean short-term rentals near Disney / US-192?",
    a: "Yes. Vacation rental cleaning covers between-guest turnovers across Kissimmee and nearby Osceola County. Hosts can also use our Airbnb turnover checklist guide for room-by-room prep.",
  },
  {
    q: "How do I compare pricing?",
    a: "Open any service page for what’s included and starting rates, or use the free price calculator. Final quotes depend on size, condition, and frequency.",
  },
] as const;

export default async function ServicesPage() {
  const config = await getPricingConfig();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cleaning Kissimmee services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: `${site.url}/services/${service.slug}`,
      description: service.summary,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.url}/services`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.2em] text-fresh">
          Services
        </p>
        <h1 className="animate-fade-up delay-1 font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
          Cleaning built for Kissimmee living
        </h1>
        <p className="animate-fade-up delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Homes, short-term rentals, and workplaces across {site.serviceArea}{" "}
          need different scopes. Each service page below lists what’s included,
          typical visit length, and where pricing starts—so you can book the
          right clean without guessing.
        </p>

        <div className="mt-14">
          <ServiceGrid config={config} />
        </div>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-3xl font-semibold text-ink">
            How to choose a service
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Start with the match below, then open the full page for checklists
            and booking. Hosts planning turnovers should also read our{" "}
            <Link
              href="/guides/airbnb-turnover-checklist-kissimmee"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              Airbnb turnover checklist
            </Link>
            .
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {choosePaths.map((item) => (
              <li key={item.href} className="border-t border-line pt-4">
                <Link
                  href={item.href}
                  className="group block"
                >
                  <h3 className="font-display text-xl font-semibold text-ink group-hover:text-fresh-deep">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-fresh">
                    View service →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

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
            . Between peak seasons, many hosts also book{" "}
            <Link
              href="/services/deep-cleaning"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              deep cleaning
            </Link>
            .
          </p>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold text-ink">
            Frequently asked questions
          </h2>
          <dl className="mt-8 max-w-3xl space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 flex flex-col gap-3 rounded-2xl bg-ink px-6 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
