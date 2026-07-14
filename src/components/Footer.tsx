import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-fresh/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">
            Cleaning <span className="text-[#7ad8cd]">Kissimmee</span>
          </p>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
            {site.tagline}. Licensed local Pros for homes, rentals, and
            workplaces across {site.address}.
          </p>
          <div className="mt-6 flex flex-col gap-1 text-sm text-white/80">
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>
            <a href={site.emailHref} className="hover:text-white">
              {site.email}
            </a>
            <span>{site.hours}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Services
          </p>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-white/75 transition hover:text-white"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Quick links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/quote" className="hover:text-white">
                Free quote
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-white">
                Book online
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Proudly serving {site.serviceArea}.</p>
        </div>
      </div>
    </footer>
  );
}
