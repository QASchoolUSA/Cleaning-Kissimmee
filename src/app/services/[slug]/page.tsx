import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { getAllServiceSlugs, getService, services, type Service } from "@/lib/services";
import { startingAtLabel } from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const AIRBNB_GUIDE = "/guides/airbnb-turnover-checklist-kissimmee";

function serviceFaqs(service: Service): { q: string; a: string }[] {
  return [
    {
      q: `What is included in ${service.shortName.toLowerCase()} in Kissimmee?`,
      a: `${service.description} Typical visits include: ${service.includes.slice(0, 3).join("; ")}.`,
    },
    {
      q: `How long does ${service.shortName.toLowerCase()} take?`,
      a: `Most ${service.shortName.toLowerCase()} visits take about ${service.duration}, depending on property size and condition across ${site.serviceArea}.`,
    },
    {
      q: `How do I book ${service.shortName.toLowerCase()}?`,
      a: `Book online, request a free quote, or call ${site.phone}. We’ll confirm timing, access notes, and final pricing before the visit.`,
    },
  ];
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const config = await getPricingConfig();
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const faqs = serviceFaqs(service);
  const isVacation = service.slug === "vacation-rental-cleaning";

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
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${site.url}/services/${service.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${site.url}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      telephone: site.phone,
      email: site.email,
      areaServed: site.serviceArea,
    },
    areaServed: site.address,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative min-h-[52vh] overflow-hidden bg-ink text-white sm:min-h-[58vh]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:min-h-[58vh] sm:px-6 sm:pb-16 lg:px-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-[#9fddd5] hover:text-white"
          >
            ← All services
          </Link>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{service.summary}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink">
              What&apos;s included
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {service.description} We serve {site.serviceArea} with clear checklists
              so hosts, homeowners, and workplaces know what to expect.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-line pt-3 text-sm text-ink-soft"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Ideal for
              </h3>
              <ul className="mt-4 space-y-2 text-muted">
                {service.idealFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {isVacation && (
              <p className="mt-10 rounded-2xl border border-line bg-paper px-5 py-4 text-sm leading-relaxed text-muted">
                Preparing turnovers? Use our{" "}
                <Link
                  href={AIRBNB_GUIDE}
                  className="font-semibold text-fresh hover:text-fresh-deep"
                >
                  Airbnb turnover checklist for Kissimmee
                </Link>{" "}
                alongside this service, or browse{" "}
                <Link href="/guides" className="font-semibold text-fresh hover:text-fresh-deep">
                  all guides
                </Link>
                .
              </p>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-paper p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-fresh">
              Starting at
            </p>
            <p className="font-display mt-2 text-4xl font-semibold text-ink">
              {startingAtLabel(service.slug, config)}
            </p>
            <p className="mt-2 text-sm text-muted">Typical visit: {service.duration}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href={`/book?service=${service.slug}`} className="w-full">
                Book this service
              </Button>
              <Button
                href={`/quote?service=${service.slug}`}
                variant="secondary"
                className="w-full"
              >
                Get a free quote
              </Button>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              Final pricing depends on size, condition, and frequency. Quotes are
              free and usually returned within one business day.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-20">
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

      <section className="border-t border-line bg-atmosphere py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-ink">
            Related services
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group border-t border-line pt-4"
              >
                <p className="font-display text-xl font-semibold text-ink group-hover:text-fresh-deep">
                  {item.shortName}
                </p>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
