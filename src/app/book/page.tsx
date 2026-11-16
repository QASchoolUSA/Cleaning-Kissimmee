import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
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
      title: `Book ${service.name}`,
      description: `Book ${service.name.toLowerCase()} online with Cleaning Kissimmee. Reserve a visit across ${site.serviceArea}.`,
      alternates: { canonical: `${site.url}/book` },
    };
  }

  return {
    title: "Book a Cleaning",
    description:
      "Book residential, vacation rental, or commercial cleaning online with Cleaning Kissimmee.",
    alternates: { canonical: `${site.url}/book` },
  };
}

const faqs = [
  {
    q: "What do I need to book online?",
    a: "Pick a service, choose a preferred day, and share access details (gate code, lockbox, or who will meet the team). We confirm timing before the visit.",
  },
  {
    q: "Can I change the service after I start?",
    a: "Yes. Select a different service in the form, or start from a service page with ?service= prefilled. Deep cleans and turnovers usually need a longer window than routine residential visits.",
  },
  {
    q: "Do you cover my neighborhood?",
    a: `We clean across ${site.serviceArea}. Enter your address when you book and we will confirm coverage when we follow up.`,
  },
] as const;

export default async function BookPage({ searchParams }: PageProps) {
  const { service = "" } = await searchParams;
  const config = await getPricingConfig();
  const selected = service ? getService(service) : undefined;

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="order-2 lg:order-1 lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
            Online booking
          </p>
          <h1 className="font-display mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:mt-3 sm:text-5xl">
            {selected
              ? `Book ${selected.shortName.toLowerCase()} in three easy taps`
              : "Reserve in three easy taps"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
            Pick a service, choose a day, share access details, and confirm. Prefer
            to compare first? Browse{" "}
            <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
              all services
            </Link>{" "}
            or hosts can review the{" "}
            <Link
              href="/guides/airbnb-turnover-checklist-kissimmee"
              className="font-semibold text-fresh hover:text-fresh-deep"
            >
              Airbnb turnover checklist
            </Link>
            .
          </p>
          <div className="mt-4 hidden space-y-3 rounded-2xl border border-line bg-white/70 p-5 text-sm text-muted sm:mt-8 sm:block">
            <p>
              <span className="font-semibold text-ink">Service area:</span>{" "}
              {site.serviceArea}
            </p>
            <p>
              <span className="font-semibold text-ink">Hours:</span> {site.hours}
            </p>
            <p>
              <span className="font-semibold text-ink">Need help?</span>{" "}
              <a href={site.phoneHref} className="text-fresh hover:text-fresh-deep">
                {site.phone}
              </a>
              {" · "}
              <Link href="/contact" className="text-fresh hover:text-fresh-deep">
                Contact
              </Link>
            </p>
          </div>

          <section className="mt-8 hidden space-y-4 text-sm leading-relaxed text-muted sm:block">
            <h2 className="font-display text-xl font-semibold text-ink">
              How booking works
            </h2>
            <p>
              Online booking is built for Kissimmee households and short-term
              rentals that need a clear path from estimate to confirmed visit.
              Choose residential for recurring upkeep, deep cleaning when the
              home needs a full reset, or vacation-rental / commercial scopes
              when turnovers and business hours matter. The form captures bed
              and bath counts, preferred timing, and access notes so crews are
              not guessing at the door.
            </p>
            <p>
              After you submit, we review the request against our calendar and
              confirm the window. Prefer to price first? Use the{" "}
              <Link href="/quote" className="font-semibold text-fresh hover:text-fresh-deep">
                price calculator
              </Link>{" "}
              or browse{" "}
              <Link href="/services" className="font-semibold text-fresh hover:text-fresh-deep">
                services
              </Link>{" "}
              before you reserve.
            </p>
          </section>

          <section className="mt-8 hidden sm:block">
            <h2 className="font-display text-xl font-semibold text-ink">
              Booking FAQ
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
          <BookingForm defaultService={service} config={config} />
        </div>
      </div>

      {/* Mobile-visible process + FAQ so thin pages still have indexable copy */}
      <div className="relative mx-auto max-w-6xl space-y-8 px-4 pb-12 sm:hidden">
        <section className="space-y-3 text-sm leading-relaxed text-muted">
          <h2 className="font-display text-lg font-semibold text-ink">
            How booking works
          </h2>
          <p>
            Choose your service, share home details and access notes, then
            submit. We confirm timing across Kissimmee, St. Cloud, Celebration,
            Poinciana, and nearby Osceola County before the crew arrives.
          </p>
          <p>
            Price first with the{" "}
            <Link href="/quote" className="font-semibold text-fresh">
              calculator
            </Link>{" "}
            or compare{" "}
            <Link href="/services" className="font-semibold text-fresh">
              services
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">
            Booking FAQ
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
