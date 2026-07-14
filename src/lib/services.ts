export type Service = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  description: string;
  idealFor: string[];
  includes: string[];
  duration: string;
  startingAt: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "residential-cleaning",
    name: "Residential Cleaning",
    shortName: "Residential",
    summary:
      "Reliable home cleaning that keeps everyday living spaces fresh without the hassle.",
    description:
      "Our residential service is built for busy Kissimmee households. We tidy kitchens, bathrooms, floors, and high-touch surfaces with consistent checklists so every visit feels predictable—and unmistakably clean.",
    idealFor: [
      "Busy families",
      "Professionals who travel",
      "Anyone who wants a reset without DIY",
    ],
    includes: [
      "Kitchen counters, sinks, and appliance exteriors",
      "Bathroom scrubbing and shine",
      "Dusting of reachable surfaces",
      "Floor vacuuming and mopping",
      "Bed making and clutter tidy",
      "Trash removal",
    ],
    duration: "2–4 hours",
    startingAt: "$129",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Clean, bright living room after residential cleaning",
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    shortName: "Deep Clean",
    summary:
      "A thorough top-to-bottom reset for homes that need extra attention.",
    description:
      "Deep cleaning goes beyond the weekly routine. We detail baseboards, interior cabinets (exterior + edges), fixtures, and hard-to-reach spots so your home feels brand new again—ideal seasonally or before guests arrive.",
    idealFor: [
      "Seasonal refreshes",
      "Post-renovation dust",
      "Homes overdue for a reset",
    ],
    includes: [
      "Everything in residential cleaning",
      "Baseboards and door frames",
      "Light switches and outlet plates",
      "Inside microwave and exterior appliances",
      "Detailed bathroom scale removal",
      "Interior window sills and tracks",
    ],
    duration: "4–7 hours",
    startingAt: "$249",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Detailed deep cleaning of a bathroom sink and fixtures",
  },
  {
    slug: "move-in-move-out",
    name: "Move-In / Move-Out Cleaning",
    shortName: "Move In/Out",
    summary:
      "Empty-home cleaning that helps you hand over keys with confidence.",
    description:
      "Whether you are leaving a rental or preparing a new place, our move cleaning focuses on empty cabinets, closets, ovens, and floors so the property shows well for owners, landlords, and new occupants.",
    idealFor: [
      "Renters ending a lease",
      "Home sellers",
      "New homeowners before furniture arrives",
    ],
    includes: [
      "Inside cabinets, drawers, and closets",
      "Appliance interiors (oven, fridge)",
      "Full bathroom and kitchen detail",
      "All floors vacuumed and mopped",
      "Cobweb and corner cleaning",
      "Window sills and tracks",
    ],
    duration: "4–8 hours",
    startingAt: "$279",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Bright empty home ready after move-out cleaning",
  },
  {
    slug: "vacation-rental-cleaning",
    name: "Vacation Rental Cleaning",
    shortName: "Vacation Rentals",
    summary:
      "Turnover-ready cleans for Airbnb and short-term rentals near the parks.",
    description:
      "Kissimmee’s vacation market moves fast. We specialize in between-guest turnovers with linen readiness, guest-facing presentation, and reliable scheduling so your listing stays 5-star ready.",
    idealFor: [
      "Airbnb hosts",
      "VRBO managers",
      "Property management teams",
    ],
    includes: [
      "Full unit clean to guest standard",
      "Kitchen reset and trash out",
      "Bathroom sanitizing",
      "Bed making with provided linens",
      "Supply restock notes when requested",
      "Photo-ready presentation",
    ],
    duration: "2–5 hours",
    startingAt: "$159",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Vacation rental bedroom prepared for the next guests",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    shortName: "Commercial",
    summary:
      "Discreet, dependable cleaning for offices and small business spaces.",
    description:
      "Keep your workplace welcoming for clients and comfortable for your team. We clean after hours or on a schedule that fits your operations—desks, restrooms, break areas, and common floors.",
    idealFor: [
      "Offices and clinics",
      "Retail storefronts",
      "Shared workspaces",
    ],
    includes: [
      "Workstations and common areas",
      "Restroom sanitizing",
      "Break room wipe-downs",
      "Floor care",
      "Trash and recycling",
      "Custom scope available",
    ],
    duration: "Custom",
    startingAt: "Custom",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern office space ready for commercial cleaning",
  },
  {
    slug: "recurring-cleaning",
    name: "Recurring Cleaning",
    shortName: "Recurring",
    summary:
      "Weekly or bi-weekly plans that keep polish without starting from scratch.",
    description:
      "Recurring service is the easiest way to stay ahead of mess. You lock in a preferred day, we learn your preferences, and each visit builds on the last—saving time and stretching value.",
    idealFor: [
      "Households wanting consistency",
      "Hosts with regular turnovers",
      "Anyone who values predictable pricing",
    ],
    includes: [
      "Same trusted residential checklist",
      "Preferred day scheduling",
      "Priority rebooking",
      "Discounted plan pricing",
      "Notes saved for preferences",
      "Easy pause / resume when traveling",
    ],
    duration: "2–4 hours",
    startingAt: "$109",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Cleaning supplies arranged for a recurring home service",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
