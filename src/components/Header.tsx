"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/quote", label: "Price calculator" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  const solid = scrolled || open || !isHome;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-md border-b border-line/70 shadow-[0_8px_30px_rgba(10,37,64,0.06)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link href="/" className="group relative min-w-0" onClick={closeMenu}>
          <span
            className={`font-display text-[1.15rem] font-semibold leading-none tracking-tight sm:text-2xl ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            Cleaning{" "}
            <span
              className={
                solid
                  ? "text-fresh group-hover:text-fresh-deep transition-colors"
                  : "text-[#7ad8cd]"
              }
            >
              Kissimmee
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-tight transition-colors ${
                  active
                    ? "text-fresh"
                    : solid
                      ? "text-ink-soft hover:text-fresh"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold sm:hidden ${
              solid
                ? "border-line bg-white text-ink"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-label={`Call ${site.phone}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href={site.phoneHref}
            className={`hidden text-sm font-semibold md:inline ${
              solid ? "text-ink-soft hover:text-fresh" : "text-white/85 hover:text-white"
            }`}
          >
            {site.phone}
          </a>
          <Link
            href="/book"
            className={`hidden rounded-full px-4 py-2.5 text-sm font-semibold transition sm:inline-flex ${
              solid
                ? "bg-ink text-white hover:bg-ink-soft"
                : "bg-white text-ink hover:bg-white/90"
            }`}
          >
            Book now
          </Link>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              solid
                ? "border-line bg-white text-ink"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-current transition ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-0.5 w-full bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-0.5 w-full bg-current transition ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-line bg-white lg:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3.5 text-base font-semibold text-ink active:bg-fresh-mist"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 pb-2">
            <Link
              href="/book"
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center rounded-2xl bg-fresh text-sm font-semibold text-white"
            >
              Book cleaning
            </Link>
            <a
              href={site.phoneHref}
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center rounded-2xl border border-line text-sm font-semibold text-ink"
            >
              Call now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
