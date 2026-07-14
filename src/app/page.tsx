import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { ServiceGrid } from "@/components/ServiceGrid";
import { site } from "@/lib/site";

const trust = [
  { label: "Local & insured", detail: "Kissimmee-based pros" },
  { label: "Clear pricing", detail: "Quotes before we clean" },
  { label: "Easy booking", detail: "Online in under 2 minutes" },
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

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-ink text-white sm:min-h-[calc(100svh-4.5rem)]">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=80"
          alt="Bright, freshly cleaned modern living room"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/72 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:min-h-[calc(100svh-4.5rem)] sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.22em] text-[#9fddd5]">
            {site.name}
          </p>
          <h1 className="animate-fade-up delay-1 font-display mt-4 max-w-3xl text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Clean that feels like Florida sunshine at home
          </h1>
          <p className="animate-fade-up delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Professional cleaning for Kissimmee homes, vacation rentals, and
            workplaces—booked simply, priced clearly.
          </p>
          <div className="animate-fade-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/book" className="w-full sm:w-auto">
              Book a cleaning
            </Button>
            <Button href="/quote" variant="ghost" className="w-full sm:w-auto">
              Get a free quote
            </Button>
          </div>
          <div
            aria-hidden
            className="animate-draw delay-4 mt-10 h-px w-24 bg-[#7ad8cd]"
          />
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {trust.map((item) => (
            <div key={item.label}>
              <p className="font-display text-xl font-semibold text-ink">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-atmosphere relative overflow-hidden py-20 sm:py-28">
        <div className="bg-grain absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
              Services
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              One company. The right clean for every space.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              From weekly homes to park-adjacent vacation turnovers, every
              service has its own page with scope, timing, and starting rates.
            </p>
          </div>
          <div className="mt-14">
            <ServiceGrid compact />
          </div>
          <div className="mt-12">
            <Link
              href="/services"
              className="text-sm font-semibold text-fresh hover:text-fresh-deep"
            >
              Browse all services →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
              How it works
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Booking should feel as clean as the result
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Start with a free quote if you want pricing first—or book a time
              directly in three short steps on any device.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/book">Book now</Button>
              <Button href="/quote" variant="secondary">
                Request quote
              </Button>
            </div>
          </div>
          <ol className="space-y-6">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[auto_1fr] gap-4 border-b border-line pb-6 last:border-0"
              >
                <span className="font-display text-3xl font-semibold text-fresh">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-muted leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-fresh/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready for a spotless reset?
          </h2>
          <p className="mt-4 text-white/75">
            Serving {site.serviceArea}. Call {site.phone} or start online in
            minutes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/book">Book cleaning</Button>
            <Button href="/quote" variant="ghost">
              Free quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
