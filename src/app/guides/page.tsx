import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

const CANONICAL = `${site.url}/guides`;

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
    href: "/guides/airbnb-turnover-checklist-kissimmee",
    title: "Airbnb Turnover Checklist for Kissimmee Vacation Rentals (2026)",
    summary:
      "Same-day STR turnover checklist: bathrooms, kitchens, bedding, pool/lanai, linen pars, and photo QA for Disney-area vacation rentals.",
  },
];

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
            Checklists and local tips for hosts and homeowners across Kissimmee,
            Celebration, and the theme-park corridor. Looking for a cleaner?{" "}
            <Link href="/services" className="font-semibold text-[#9fddd5] hover:text-white">
              Browse services
            </Link>{" "}
            or{" "}
            <Link href="/book" className="font-semibold text-[#9fddd5] hover:text-white">
              book online
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="block border-t border-line pt-5 transition hover:border-fresh"
                >
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {guide.title}
                  </h2>
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
    </>
  );
}
