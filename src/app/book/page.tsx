import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Cleaning",
  description:
    "Book residential, vacation rental, or commercial cleaning online with Cleaning Kissimmee.",
};

type PageProps = {
  searchParams: Promise<{ service?: string }>;
};

export default async function BookPage({ searchParams }: PageProps) {
  const { service = "" } = await searchParams;

  return (
    <div className="bg-atmosphere relative overflow-hidden">
      <div className="bg-grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
            Online booking
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Reserve your clean in three easy steps
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Pick a service, choose a day, share access details, and confirm.
            Designed for thumbs on the go and clear on desktop.
          </p>
          <div className="mt-8 space-y-4 rounded-2xl border border-line bg-white/70 p-5 text-sm text-muted">
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
            </p>
          </div>
        </div>
        <BookingForm defaultService={service} />
      </div>
    </div>
  );
}
