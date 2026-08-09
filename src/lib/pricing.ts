import { getService } from "@/lib/services";

/**
 * Every number this site charges. Booking Broom is the source of truth; the
 * values in `DEFAULT_PRICING_CONFIG` are what shipped and are used whenever the
 * dashboard cannot be reached, so a quote is never blocked on it.
 */
export type PricingConfig = {
  kind: "band-lookup-range";
  basePrices: { key: string; value: number }[];
  /** Keyed by the label the form shows, e.g. "Studio", "5+". */
  bedroomAddon: { key: string; value: number }[];
  bathroomAddon: { key: string; value: number }[];
  frequencyMultipliers: { key: string; label: string; multiplier: number }[];
  /** Square footage included before the per-step charge applies. */
  sqftThreshold: number;
  sqftStep: number;
  sqftStepPrice: number;
  /** Quoted band as fractions of the midpoint. */
  rangeLow: number;
  rangeHigh: number;
};

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "band-lookup-range",
  basePrices: [
    { key: "residential-cleaning", value: 129 },
    { key: "deep-cleaning", value: 249 },
    { key: "move-in-move-out", value: 279 },
    { key: "vacation-rental-cleaning", value: 159 },
    { key: "commercial-cleaning", value: 199 },
    { key: "recurring-cleaning", value: 109 },
  ],
  bedroomAddon: [
    { key: "Studio", value: 0 },
    { key: "1", value: 0 },
    { key: "2", value: 20 },
    { key: "3", value: 40 },
    { key: "4", value: 70 },
    { key: "5+", value: 100 },
  ],
  bathroomAddon: [
    { key: "1", value: 0 },
    { key: "1.5", value: 15 },
    { key: "2", value: 30 },
    { key: "2.5", value: 45 },
    { key: "3", value: 60 },
    { key: "3.5", value: 75 },
    { key: "4+", value: 95 },
  ],
  frequencyMultipliers: [
    { key: "One-time", label: "One-time", multiplier: 1 },
    { key: "Weekly", label: "Weekly", multiplier: 0.82 },
    { key: "Bi-weekly", label: "Bi-weekly", multiplier: 0.88 },
    { key: "Monthly", label: "Monthly", multiplier: 0.94 },
  ],
  sqftThreshold: 2000,
  sqftStep: 250,
  sqftStepPrice: 15,
  rangeLow: 0.92,
  rangeHigh: 1.12,
};

/**
 * Guards against a remote config that parses as JSON but has no base price for a
 * service the site sells, which would otherwise silently hide the estimate.
 */
export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "band-lookup-range") return false;

  const numbers = [
    config.sqftThreshold,
    config.sqftStep,
    config.sqftStepPrice,
    config.rangeLow,
    config.rangeHigh,
  ];
  if (numbers.some((n) => typeof n !== "number")) return false;

  if (!Array.isArray(config.bedroomAddon) || config.bedroomAddon.length === 0) {
    return false;
  }
  if (!Array.isArray(config.bathroomAddon) || config.bathroomAddon.length === 0) {
    return false;
  }
  if (
    !Array.isArray(config.frequencyMultipliers) ||
    config.frequencyMultipliers.length === 0
  ) {
    return false;
  }
  if (!Array.isArray(config.basePrices)) return false;

  return DEFAULT_PRICING_CONFIG.basePrices.every((shipped) =>
    config.basePrices!.some((row) => row.key === shipped.key)
  );
}

function lookup(rows: { key: string; value: number }[], key: string) {
  return rows.find((row) => row.key === key)?.value;
}

export function basePriceFor(
  service: string,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): number | undefined {
  return lookup(config.basePrices, service);
}

/**
 * The "from $X" figure on service cards. Services sold on consultation keep
 * their copy, so the number is only used where a price is actually published.
 */
export function startingAtLabel(
  service: string,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): string {
  if (getService(service)?.quoteOnRequest) return "Custom";
  const base = basePriceFor(service, config);
  return base === undefined ? "Custom" : formatMoney(base);
}

export function estimateQuote(
  input: {
    service: string;
    bedrooms: string;
    bathrooms: string;
    frequency: string;
    sqft?: string;
  },
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): { low: number; high: number; mid: number; label: string } | null {
  const base = basePriceFor(input.service, config);
  if (!base) return null;

  const beds = lookup(config.bedroomAddon, input.bedrooms) ?? 40;
  const baths = lookup(config.bathroomAddon, input.bathrooms) ?? 30;
  const mult =
    config.frequencyMultipliers.find((f) => f.key === input.frequency)
      ?.multiplier ?? 1;

  let sqftExtra = 0;
  const parsed = Number(String(input.sqft).replace(/[^0-9]/g, ""));
  if (parsed > config.sqftThreshold) {
    sqftExtra =
      Math.round((parsed - config.sqftThreshold) / config.sqftStep) *
      config.sqftStepPrice;
  }

  const mid = Math.round((base + beds + baths + sqftExtra) * mult);
  const low = Math.round(mid * config.rangeLow);
  const high = Math.round(mid * config.rangeHigh);
  const service = getService(input.service);

  return {
    low,
    high,
    mid,
    label: service?.shortName ?? "Cleaning",
  };
}

export function formatMoney(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

/** The forms label these as chips ("Studio", "4+"); Booking Broom wants numbers. */
export function bedroomCount(value: string): number | undefined {
  if (value === "Studio") return 0;
  const parsed = Number(value.replace("+", ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function bathroomCount(value: string): number | undefined {
  const parsed = Number(value.replace("+", ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function squareFeetCount(value: string): number | undefined {
  const parsed = Number(String(value).replace(/[^0-9]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}
