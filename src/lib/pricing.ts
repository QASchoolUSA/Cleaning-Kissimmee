import { getService } from "@/lib/services";

/**
 * sqft-rate-min engine (Davenport pattern) with STANDARD rates.
 * Booking Broom is the source of truth; DEFAULT_PRICING_CONFIG is the offline fallback.
 */

export type ServiceTypeId =
  | "house"
  | "apartment"
  | "move"
  | "airbnb"
  | "post-construction"
  | "maintenance"
  | "deep";

export type FrequencyId = "one-time" | "weekly" | "bi-weekly" | "monthly";

export type PricingConfig = {
  kind: "sqft-rate-min";
  serviceRates: { key: string; perSqft: number; minBase: number }[];
  bedroomRate: number;
  bathroomRate: number;
  frequencyMultipliers: { key: string; label: string; multiplier: number }[];
  addOns: { key: string; label: string; price: number }[];
  sqftPresets: { label: string; value: number }[];
  minSqft: number;
  maxSqft: number;
};

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "sqft-rate-min",
  serviceRates: [
    { key: "house", perSqft: 0.15, minBase: 129 },
    { key: "apartment", perSqft: 0.15, minBase: 99 },
    { key: "move", perSqft: 0.23, minBase: 189 },
    { key: "airbnb", perSqft: 0.12, minBase: 149 },
    { key: "post-construction", perSqft: 0.39, minBase: 249 },
    { key: "maintenance", perSqft: 0.15, minBase: 109 },
    { key: "deep", perSqft: 0.2, minBase: 199 },
  ],
  bedroomRate: 18,
  bathroomRate: 28,
  frequencyMultipliers: [
    { key: "one-time", label: "One-time", multiplier: 1 },
    { key: "weekly", label: "Weekly", multiplier: 0.85 },
    { key: "bi-weekly", label: "Bi-weekly", multiplier: 0.9 },
    { key: "monthly", label: "Monthly", multiplier: 0.95 },
  ],
  addOns: [
    { key: "kitchen-deep", label: "Kitchen deep clean", price: 45 },
    { key: "oven", label: "Oven cleaning", price: 35 },
    { key: "fridge", label: "Fridge cleaning", price: 35 },
    { key: "windows-interior", label: "Windows (interior)", price: 40 },
    { key: "windows-exterior", label: "Windows (exterior)", price: 55 },
    { key: "laundry", label: "Laundry fold & put away", price: 25 },
    { key: "cabinets", label: "Inside cabinets", price: 40 },
    { key: "garage", label: "Garage sweep & wipe", price: 50 },
    { key: "balcony", label: "Patio / balcony", price: 30 },
    { key: "pets", label: "Pet-friendly detail", price: 20 },
  ],
  sqftPresets: [
    { label: "Under 800 sq ft", value: 600 },
    { label: "800\u20131,200 sq ft", value: 1000 },
    { label: "1,200\u20132,000 sq ft", value: 1600 },
    { label: "2,000\u20132,600 sq ft", value: 2200 },
    { label: "2,600+ sq ft", value: 3000 },
  ],
  minSqft: 400,
  maxSqft: 6000,
};

/** Marketing service slugs → unified BB keys. */
export const SERVICE_SLUG_TO_TYPE: Record<string, ServiceTypeId> = {
  "residential-cleaning": "house",
  "deep-cleaning": "deep",
  "move-in-move-out": "move",
  "vacation-rental-cleaning": "airbnb",
  "recurring-cleaning": "maintenance",
  "commercial-cleaning": "house",
};

const SERVICE_TYPE_IDS: ServiceTypeId[] = [
  "house",
  "apartment",
  "move",
  "airbnb",
  "post-construction",
  "maintenance",
  "deep",
];

const FREQUENCY_IDS: FrequencyId[] = [
  "one-time",
  "weekly",
  "bi-weekly",
  "monthly",
];

/** Title-case form chips → FrequencyId. */
const FREQUENCY_LABEL_TO_ID: Record<string, FrequencyId> = {
  "One-time": "one-time",
  Weekly: "weekly",
  "Bi-weekly": "bi-weekly",
  Monthly: "monthly",
  "one-time": "one-time",
  weekly: "weekly",
  "bi-weekly": "bi-weekly",
  monthly: "monthly",
};

/** Form sqft chip labels → midpoint used for the estimate. */
const SQFT_LABEL_TO_VALUE: Record<string, number> = {
  "Under 1,000": 800,
  "1,000–1,500": 1250,
  "1,500–2,500": 2000,
  "2,500–4,000": 3200,
  "4,000+": 4500,
};

export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "sqft-rate-min") return false;
  if (typeof config.bedroomRate !== "number") return false;
  if (typeof config.bathroomRate !== "number") return false;
  if (typeof config.minSqft !== "number") return false;
  if (typeof config.maxSqft !== "number") return false;
  if (!Array.isArray(config.sqftPresets) || config.sqftPresets.length === 0) {
    return false;
  }
  if (!Array.isArray(config.serviceRates)) return false;
  if (!Array.isArray(config.frequencyMultipliers)) return false;
  if (!Array.isArray(config.addOns)) return false;

  return (
    SERVICE_TYPE_IDS.every((id) =>
      config.serviceRates!.some((rate) => rate.key === id),
    ) &&
    FREQUENCY_IDS.every((id) =>
      config.frequencyMultipliers!.some((freq) => freq.key === id),
    )
  );
}

export function calculatePrice(
  input: {
    serviceType: ServiceTypeId;
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    frequency: FrequencyId;
    addons?: string[];
  },
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
) {
  const sqft = Math.max(config.minSqft, Math.min(config.maxSqft, input.sqft));
  const bedrooms = Math.max(0, Math.min(8, input.bedrooms));
  const bathrooms = Math.max(1, Math.min(8, input.bathrooms));

  const rate = config.serviceRates.find((r) => r.key === input.serviceType);
  const rawBase = sqft * (rate?.perSqft ?? 0);
  const base = Math.max(rate?.minBase ?? 0, Math.round(rawBase));
  const bedroomCost = bedrooms * config.bedroomRate;
  const bathroomCost = bathrooms * config.bathroomRate;
  const addonCost = (input.addons ?? []).reduce((sum, id) => {
    const addOn = config.addOns.find((a) => a.key === id);
    return sum + (addOn?.price ?? 0);
  }, 0);

  const subtotal = base + bedroomCost + bathroomCost + addonCost;
  const frequencyMultiplier =
    config.frequencyMultipliers.find((f) => f.key === input.frequency)
      ?.multiplier ?? 1;
  const total = Math.round(subtotal * frequencyMultiplier);

  return { base, subtotal, total, frequencyMultiplier };
}

export function basePriceFor(
  service: string,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): number | undefined {
  const type = SERVICE_SLUG_TO_TYPE[service];
  if (!type) return undefined;
  return config.serviceRates.find((r) => r.key === type)?.minBase;
}

export function startingAtLabel(
  service: string,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
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
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): { low: number; high: number; mid: number; label: string } | null {
  const type = SERVICE_SLUG_TO_TYPE[input.service];
  if (!type || getService(input.service)?.quoteOnRequest) return null;

  const beds = bedroomCount(input.bedrooms) ?? 3;
  const baths = Math.max(1, bathroomCount(input.bathrooms) ?? 2);
  const frequency = FREQUENCY_LABEL_TO_ID[input.frequency] ?? "one-time";

  let sqft = 1600;
  if (input.sqft) {
    const fromLabel = SQFT_LABEL_TO_VALUE[input.sqft];
    if (fromLabel !== undefined) {
      sqft = fromLabel;
    } else {
      const parsed = squareFeetCount(input.sqft);
      if (parsed) sqft = parsed;
    }
  }

  const { total } = calculatePrice(
    {
      serviceType: type,
      sqft,
      bedrooms: beds,
      bathrooms: baths,
      frequency,
    },
    config,
  );

  // Keep a narrow display band so existing range UI still reads naturally.
  const mid = total;
  const low = Math.round(mid * 0.95);
  const high = Math.round(mid * 1.05);
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
