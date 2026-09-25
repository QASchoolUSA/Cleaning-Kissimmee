import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Cleaning Kissimmee—local professionals delivering reliable home and rental cleaning across Central Florida.",
  alternates: { canonical: `${site.url}/about` },
};

const values = [
  {
    title: "Respect for your space",
    text: "We treat every home and rental like a guest would—careful with belongings, clear with communication.",
  },
  {
    title: "Consistency over shortcuts",
    text: "Checklists, timing, and follow-through matter more than a one-time sparkle.",
  },
  {
    title: "Local accountability",
    text: "We're based in Kissimmee, so your booking is handled by people who know the area.",
  },
];

const faqs = [
  {
    q: "Is Cleaning Kissimmee a local company?",
    a: `Yes. We're based in ${site.address} and serve ${site.serviceArea}.`,
  },
  {
    q: "Do you clean vacation rentals near the parks?",
    a: "Yes—vacation rental turnovers are a core service. Hosts can also use our Airbnb turnover checklist guide for room-by-room prep.",
  },
  {
    q: "How do I get started?",
    a: "Book online, request a free quote, or call us during business hours. We'll confirm scope, timing, and access notes.",
  },
] as const;

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description: site.tagline,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556911220-bff31c8750ea?auto=format&fit=crop&w=2000&q=80"
            alt="Bright Florida kitchen after a professional clean"
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9fddd5]">
            About {site.name}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            A cleaning company built for real Central Florida life
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Between busy households, park visitors, and short-term rentals,
            Kissimmee stays active. We keep spaces guest-ready without complicated
            scheduling.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Professional, approachable, dependable
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {site.name} provides residential, commercial, and vacation rental
                cleaning with clear communication from quote to walkthrough. We
                focus on thoughtful details—lined trash cans, wiped switches, and
                floors that feel finished—so you notice the difference when you
                walk in.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Whether you need a one-time deep clean or a recurring plan, our
                booking and quote tools are designed to be simple on your phone
                and complete on your desktop. Explore{" "}
                <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
                  cleaning services
                </Link>
                , read our{" "}
                <Link href="/guides" className="font-semibold text-fresh hover:text-fresh-deep">
                  local guides
                </Link>
                , or jump to the{" "}
                <Link
                  href="/guides/airbnb-turnover-checklist-kissimmee"
                  className="font-semibold text-fresh hover:text-fresh-deep"
                >
                  Airbnb turnover checklist
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-6">
              {values.map((value) => (
                <div key={value.title} className="border-t border-line pt-5">
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-muted leading-relaxed">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Button href="/book">Book a cleaning</Button>
            <Button href="/contact" variant="secondary">
              Contact us
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-atmosphere py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink">About FAQ</h2>
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
