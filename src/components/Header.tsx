"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/quote", label: "Free Quote" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/90 backdrop-blur-md border-b border-line/70 shadow-[0_8px_30px_rgba(10,37,64,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <Link href="/" className="group relative min-w-0">
          <span className="font-display text-[1.35rem] font-semibold leading-none tracking- tight text-ink sm:text-2xl">
            Cleaning{" "}
            <span className="text-fresh group-hover:text-fresh-deep transition-colors">
              Kissimmee
            </span>
          </span>
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-[2px] w-10 origin-left scale-x-0 bg-fresh transition-transform duration-300 group-hover:scale-x-100"
          />
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
                  active ? "text-fresh" : "text-ink-soft hover:text-fresh"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden text-sm font-semibold text-ink-soft hover:text-fresh md:inline"
          >
            {site.phone}
          </a>
          <Link
            href="/book"
            className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-soft sm:inline-flex"
          >
            Book now
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
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
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-fresh-mist"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={closeMenu}
            className="mt-2 rounded-full bg-fresh px-4 py-3 text-center text-base font-semibold text-white"
          >
            Book cleaning
          </Link>
          <a
            href={site.phoneHref}
            onClick={closeMenu}
            className="rounded-xl px-3 py-3 text-center text-sm font-semibold text-muted"
          >
            Call {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
