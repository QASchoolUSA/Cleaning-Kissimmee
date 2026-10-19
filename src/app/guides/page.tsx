import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

const CANONICAL = `${site.url}/guides`;
const AIRBNB_GUIDE = "/guides/airbnb-turnover-checklist-kissimmee";

export const metadata: Metadata = {
  title: "Cleaning Guides for Kissimmee, FL",
  description:
    "Practical cleaning guides for Kissimmee hosts and homeowners—vacation rental turnovers, checklists, and local tips from Cleaning Kissimmee.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Cleaning Guides for Kissimmee, FL",
    description:
      "Practical cleaning guides for Kissimmee hosts and homeowners from Cleaning Kissimmee.",
    url: CANONICAL,
    siteName: site.name,
    type: "website",
  },
};

const guides = [
  {
    href: AIRBNB_GUIDE,
    title: "Airbnb Turnover Checklist for Kissimmee Vacation Rentals (2026)",
    summary:
      "Same-day STR turnover checklist: bathrooms, kitchens, bedding, pool/lanai, linen pars, and photo QA for Disney-area vacation rentals.",
  },
];

const relatedServices = [
  {
    href: "/services/vacation-rental-cleaning",
    title: "Vacation rental cleaning",
    text: "Between-guest turnovers with linen readiness and guest-facing presentation.",
  },
  {
    href: "/services/deep-cleaning",
    title: "Deep cleaning",
    text: "Seasonal resets after heavy occupancy—grout, baseboards, and outdoor-adjacent floors.",
  },
  {
    href: "/services/move-in-move-out",
    title: "Move-in / move-out",
    text: "Empty-home cleans when ownership or furnishings change between seasons.",
  },
  {
    href: "/services/recurring-cleaning",
    title: "Recurring cleaning",
    text: "Preferred-day plans for homes and hosts who want consistency between peaks.",
  },
] as const;

const faqs = [
  {
    q: "Who are these Kissimmee cleaning guides for?",
    a: "Primarily Airbnb and short-term rental hosts near the theme-park corridor, plus homeowners who want clear checklists before booking a professional clean.",
  },
  {
    q: "Does the Airbnb turnover checklist replace a cleaner?",
    a: "No. It’s a planning and QA checklist so hosts and crews share the same room-by-room standard. Book vacation rental cleaning when you need a professional same-day turn.",
  },
  {
    q: "Where can I book cleaning after reading a guide?",
    a: `Browse services or book online. Cleaning Kissimmee serves ${site.serviceArea}.`,
  },
] as const;

export default function GuidesIndexPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: CANONICAL },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kissimmee Cleaning Guides",
    itemListElement: guides.map((g, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: g.title,
      url: `${site.url}${g.href}`,
    })),
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
    <>
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

      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-fresh/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9fddd5]">
            Guides
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Cleaning guides for Kissimmee, FL
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Checklists and practical tips for hosts and homeowners across{" "}
            {site.serviceArea}. Start with the Airbnb turnover guide if you run
            a short-term rental—then book the matching service when you need a
            crew.
          </p>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Looking for a cleaner?{" "}
            <Link href="/services" className="font-semibold text-[#9fddd5] hover:text-white">
              Browse services
            </Link>
            , open{" "}
            <Link
              href="/services/vacation-rental-cleaning"
              className="font-semibold text-[#9fddd5] hover:text-white"
            >
              vacation rental cleaning
            </Link>
            , or{" "}
            <Link href="/book" className="font-semibold text-[#9fddd5] hover:text-white">
              book online
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-ink">
              Featured: Airbnb turnover checklist
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Kissimmee short-term rentals often turn the same day between
              checkout and check-in. Our checklist covers bathrooms, kitchens,
              bedding, pool and lanai touchpoints, linen pars, and photo QA—so
              hosts and cleaners share one guest-ready standard. It complements{" "}
              <Link
                href="/services/vacation-rental-cleaning"
                className="font-semibold text-fresh hover:text-fresh-deep"
              >
                vacation rental cleaning
              </Link>
              ; it does not replace a professional turnover when timing is tight.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="block border-t border-line pt-5 transition hover:border-fresh"
                >
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    {guide.summary}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-fresh">
                    Read the guide →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-atmosphere py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink">
            Related cleaning services
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            After you read a guide, pick the service that matches your property
            and schedule.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {relatedServices.map((item) => (
              <li key={item.href} className="border-t border-line pt-4">
                <Link href={item.href} className="group block">
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
          <p className="mt-8 text-sm text-muted">
            See the full list on{" "}
            <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
              all services
            </Link>
            , including{" "}
            <Link
              href="/services/residential-cleaning"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              residential
            </Link>{" "}
            and{" "}
            <Link
              href="/services/commercial-cleaning"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              commercial cleaning
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </>
  );
}
