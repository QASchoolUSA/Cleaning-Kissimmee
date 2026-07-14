import Link from "next/link";
import { services } from "@/lib/services";

export function ServiceGrid({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="grid gap-x-8 gap-y-6 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group block rounded-2xl border border-line bg-white/70 p-4 transition active:scale-[0.99] sm:rounded-none sm:border-0 sm:border-t sm:bg-transparent sm:p-0 sm:pt-5 sm:hover:border-fresh"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink group-hover:text-fresh-deep sm:text-2xl">
              {service.shortName}
            </h3>
            <span className="shrink-0 text-xs font-semibold text-fresh sm:text-sm">
              {service.startingAt === "Custom"
                ? "Custom"
                : `From ${service.startingAt}`}
            </span>
          </div>
          <p
            className={`mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-[0.95rem] ${
              compact ? "line-clamp-2" : ""
            }`}
          >
            {service.summary}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink sm:mt-4">
            View service
            <span aria-hidden>→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
