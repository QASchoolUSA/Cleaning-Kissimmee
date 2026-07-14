import Link from "next/link";
import { services } from "@/lib/services";

export function ServiceGrid({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group block border-t border-line pt-5 transition hover:border-fresh"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-fresh-deep">
              {service.shortName}
            </h3>
            <span className="text-sm font-semibold text-fresh">
              {service.startingAt === "Custom"
                ? "Custom"
                : `From ${service.startingAt}`}
            </span>
          </div>
          <p
            className={`mt-3 text-[0.95rem] leading-relaxed text-muted ${
              compact ? "line-clamp-2" : ""
            }`}
          >
            {service.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:gap-3 transition-all">
            View service
            <span aria-hidden>→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
