import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative -mt-14 overflow-hidden bg-ink text-white sm:-mt-[4.5rem]">
      <div className="relative min-h-[100svh]">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=80"
          alt="Bright, freshly cleaned modern living room"
          fill
          priority
          className="object-cover object-[68%_40%] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink/94 sm:bg-gradient-to-r sm:from-ink/88 sm:via-ink/70 sm:to-ink/30" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/50 via-transparent to-transparent sm:block" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-between px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[4.75rem] sm:justify-end sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24">
          <div className="sm:hidden">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#9fddd5] backdrop-blur-sm">
              Kissimmee · FL
            </p>
          </div>

          <div className="mt-auto max-w-3xl pb-2 sm:pb-0">
            <p className="animate-fade-up hidden text-xs font-bold uppercase tracking-[0.22em] text-[#9fddd5] sm:block">
              {site.name}
            </p>
            <h1 className="animate-fade-up delay-1 font-display mt-3 text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:mt-4 sm:text-6xl lg:text-7xl">
              <span className="sm:hidden">Spotless homes, simple booking</span>
              <span className="hidden sm:inline">
                Clean that feels like Florida sunshine at home
              </span>
            </h1>
            <p className="animate-fade-up delay-2 mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/85 sm:mt-5 sm:max-w-xl sm:text-lg">
              <span className="sm:hidden">
                Homes & vacation rentals across Kissimmee—priced clearly, booked
                in minutes.
              </span>
              <span className="hidden sm:inline">
                Professional cleaning for Kissimmee homes, vacation rentals, and
                workplaces—booked simply, priced clearly.
              </span>
            </p>

            <div className="animate-fade-up delay-3 mt-8 hidden gap-3 sm:flex sm:flex-row sm:items-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-fresh px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_rgba(15,138,125,0.28)] transition hover:bg-fresh-deep"
              >
                Book a cleaning
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-transparent px-7 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-white/10"
              >
                Get a free quote
              </Link>
            </div>
            <div
              aria-hidden
              className="animate-draw delay-4 mt-10 hidden h-px w-24 bg-[#7ad8cd] sm:block"
            />
          </div>

          <div className="animate-fade-up delay-3 mt-6 space-y-2.5 sm:hidden">
            <Link
              href="/book"
              className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-fresh text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,138,125,0.35)] active:scale-[0.99]"
            >
              Book a cleaning
            </Link>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/quote"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-ink active:scale-[0.99]"
              >
                Price calculator
              </Link>
              <a
                href={site.phoneHref}
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/35 bg-white/10 text-sm font-semibold text-white backdrop-blur-sm active:scale-[0.99]"
              >
                Call us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
