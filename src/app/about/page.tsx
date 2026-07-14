import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Cleaning Kissimmee—local professionals delivering reliable home and rental cleaning across Central Florida.",
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
    text: "We’re based in Kissimmee, so your booking is handled by people who know the area.",
  },
];

export default function AboutPage() {
  return (
    <>
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
                and complete on your desktop.
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
    </>
  );
}
