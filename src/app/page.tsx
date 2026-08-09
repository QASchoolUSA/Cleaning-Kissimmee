import Link from "next/link";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { getPricingConfig } from "@/lib/pricing-config";
import { site } from "@/lib/site";

const trust = [
  { label: "Local & insured", detail: "Kissimmee-based pros" },
  { label: "Clear pricing", detail: "Instant estimate first" },
  { label: "Easy booking", detail: "Done in minutes" },
];

const steps = [
  {
    n: "01",
    title: "Tell us what you need",
    text: "Pick a service, share a few property details, and choose a time that works.",
  },
  {
    n: "02",
    title: "We confirm & arrive",
    text: "You’ll get a confirmation with timing, access notes, and what to expect.",
  },
  {
    n: "03",
    title: "Enjoy the reset",
    text: "We clean with a clear checklist and leave your space guest-ready.",
  },
];

export default async function HomePage() {
  const config = await getPricingConfig();

  return (
    <>
      <Hero />

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {trust.map((item) => (
              <div
                key={item.label}
                className="min-w-[70%] shrink-0 rounded-2xl border border-line/80 bg-paper px-4 py-3.5 sm:min-w-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
              >
                <p className="font-display text-lg font-semibold text-ink sm:text-xl">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-atmosphere relative overflow-hidden py-14 sm:py-28">
        <div className="bg-grain absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
              Services
            </p>
            <h2 className="font-display mt-3 text-[1.85rem] font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              The right clean for every space
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-lg">
              Homes, vacation turnovers, and workplaces—each with its own scope
              and starting rate.
            </p>
          </div>
          <div className="mt-8 sm:mt-14">
            <ServiceGrid compact config={config} />
          </div>
          <div className="mt-8 sm:mt-12">
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-fresh hover:text-fresh-deep"
            >
              Browse all services →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
              How it works
            </p>
            <h2 className="font-display mt-3 text-[1.85rem] font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              Booking should feel as clean as the result
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted sm:mt-4">
              Start with the price calculator—or book a time directly in three
              short steps.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-row">
              <Button href="/book" className="min-h-12 w-full rounded-2xl sm:w-auto sm:rounded-full">
                Book now
              </Button>
              <Button
                href="/quote"
                variant="secondary"
                className="min-h-12 w-full rounded-2xl sm:w-auto sm:rounded-full"
              >
                Price calculator
              </Button>
            </div>
          </div>
          <ol className="space-y-5 sm:space-y-6">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[auto_1fr] gap-3 border-b border-line pb-5 last:border-0 sm:gap-4 sm:pb-6"
              >
                <span className="font-display text-2xl font-semibold text-fresh sm:text-3xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-14 text-white sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-fresh/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-[1.85rem] font-semibold tracking-tight sm:text-5xl">
            Ready for a spotless reset?
          </h2>
          <p className="mt-3 text-sm text-white/75 sm:mt-4 sm:text-base">
            Serving {site.address} & nearby. Call {site.phone} or start online.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:flex sm:flex-row sm:justify-center">
            <Button href="/book" className="min-h-12 w-full rounded-2xl sm:w-auto sm:rounded-full">
              Book cleaning
            </Button>
            <Button
              href="/quote"
              variant="ghost"
              className="min-h-12 w-full rounded-2xl sm:w-auto sm:rounded-full"
            >
              Free quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
