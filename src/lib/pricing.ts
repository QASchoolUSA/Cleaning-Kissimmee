import { getService } from "@/lib/services";

const basePrices: Record<string, number> = {
  "residential-cleaning": 129,
  "deep-cleaning": 249,
  "move-in-move-out": 279,
  "vacation-rental-cleaning": 159,
  "commercial-cleaning": 199,
  "recurring-cleaning": 109,
};

const bedroomAddon: Record<string, number> = {
  Studio: 0,
  "1": 0,
  "2": 20,
  "3": 40,
  "4": 70,
  "5+": 100,
};

const bathroomAddon: Record<string, number> = {
  "1": 0,
  "1.5": 15,
  "2": 30,
  "2.5": 45,
  "3": 60,
  "3.5": 75,
  "4+": 95,
};

const frequencyMultiplier: Record<string, number> = {
  "One-time": 1,
  Weekly: 0.82,
  "Bi-weekly": 0.88,
  Monthly: 0.94,
};

export function estimateQuote(input: {
  service: string;
  bedrooms: string;
  bathrooms: string;
  frequency: string;
  sqft?: string;
}): { low: number; high: number; label: string } | null {
  const base = basePrices[input.service];
  if (!base) return null;

  const beds = bedroomAddon[input.bedrooms] ?? 40;
  const baths = bathroomAddon[input.bathrooms] ?? 30;
  const mult = frequencyMultiplier[input.frequency] ?? 1;

  let sqftExtra = 0;
  const parsed = Number(String(input.sqft).replace(/[^0-9]/g, ""));
  if (parsed > 2000) sqftExtra = Math.round((parsed - 2000) / 250) * 15;

  const mid = Math.round((base + beds + baths + sqftExtra) * mult);
  const low = Math.round(mid * 0.92);
  const high = Math.round(mid * 1.12);
  const service = getService(input.service);

  return {
    low,
    high,
    label: service?.shortName ?? "Cleaning",
  };
}

export function formatMoney(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}
