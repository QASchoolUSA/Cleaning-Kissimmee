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
      <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="order-2 lg:order-1 lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fresh">
            Online booking
          </p>
          <h1 className="font-display mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:mt-3 sm:text-5xl">
            Reserve in three easy taps
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
            Pick a service, choose a day, share access details, and confirm.
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
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <BookingForm defaultService={service} />
        </div>
      </div>
    </div>
  );
}
