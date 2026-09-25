import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Cleaning Kissimmee for quotes, bookings, and service questions across Kissimmee and nearby areas.",
  alternates: { canonical: `${site.url}/contact` },
};

const faqs = [
  {
    q: "What is the fastest way to reach you?",
    a: `Call ${site.phone} during ${site.hours}, or email ${site.email}. For most jobs, booking or quoting online is fastest.`,
  },
  {
    q: "Do you serve areas outside Kissimmee?",
    a: `Yes—${site.serviceArea}. Share your address when you book or quote and we’ll confirm coverage.`,
  },
  {
    q: "Where can I compare services before contacting you?",
    a: "Browse the services index, then open the vacation rental, residential, or deep cleaning pages—or read our Airbnb turnover checklist if you host.",
  },
] as const;

export default function ContactPage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kissimmee",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: site.serviceArea,
    openingHours: "Mo-Sa 08:00-18:00",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
          our online quote or booking flow. Prefer to self-serve first? Browse{" "}
          <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
            services
          </Link>{" "}
          and{" "}
          <Link href="/guides" className="font-semibold text-fresh hover:text-fresh-deep">
            guides
          </Link>
          .
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

        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Contact FAQ</h2>
          <dl className="mt-8 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">
                  {item.a}{" "}
                  {item.q.includes("compare") && (
                    <>
                      <Link
                        href="/services/vacation-rental-cleaning"
                        className="font-semibold text-fresh hover:text-fresh-deep"
                      >
                        Vacation rentals
                      </Link>
                      {" · "}
                      <Link
                        href="/guides/airbnb-turnover-checklist-kissimmee"
                        className="font-semibold text-fresh hover:text-fresh-deep"
                      >
                        Airbnb checklist
                      </Link>
                      .
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
