import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

const SLUG = "airbnb-turnover-checklist-kissimmee";
const CANONICAL = `${site.url}/guides/${SLUG}`;
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1600&q=80";
const TITLE =
  "Airbnb Turnover Checklist for Kissimmee Vacation Rentals (2026)";
const DESCRIPTION =
  "Same-day Kissimmee STR turnover checklist: bathrooms, kitchens, bedding, pool/lanai, linen pars, and photo QA for Disney-area vacation rentals. Used by Cleaning Kissimmee crews.";

const DIRECT_ANSWER =
  "An Airbnb (short-term rental) turnover in Kissimmee is a same-day reset that makes a vacation home guest-ready between checkouts and check-ins—typically in 75–150 minutes depending on bedrooms, outdoor zones, and linen access. Cleaning Kissimmee’s vacation-rental clean covers bathrooms, kitchens, bedding change-outs, floors, high-touch surfaces, trash/recycling, and photo QA of review-risk rooms. Theme-park corridor homes often need extra attention on outdoor furniture film, pool-deck tracking, and guest bathroom mildew.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: site.name,
    type: "article",
    images: [HERO_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMAGE],
  },
};

const faqs = [
  {
    question: "How long does an Airbnb turnover take in Kissimmee?",
    answer:
      "Most 1–2 bedroom turns take about 75–105 minutes with linens staged. Three-bedroom villas often need about 150 minutes, plus buffer when outdoor zones are in scope or checkout runs late.",
  },
  {
    question:
      "What is included in vacation rental cleaning vs regular house cleaning?",
    answer:
      "Turnovers emphasize bedding change-outs, bathroom disinfection, trash, restock pars, and photo QA on a tight clock. Recurring residential cleans focus on maintenance soil between longer gaps.",
  },
  {
    question: "Do you clean short-term rentals near Disney World / US-192?",
    answer:
      "Yes. Cleaning Kissimmee supports vacation homes and condos in the Kissimmee theme-park corridor. Share the exact address and gate instructions on the quote form.",
  },
  {
    question: "Should hosts provide linens?",
    answer:
      "Yes. Professional teams work fastest when clean sheet and towel sets are already on site. Linen shortages are the top cause of delayed ready-times.",
  },
  {
    question: "Can you do a deep clean between peak seasons?",
    answer:
      "Yes. Schedule deep cleaning after heavy summer or holiday occupancy to reset grout, baseboards, and neglected outdoor-adjacent floors.",
  },
];

export default function AirbnbTurnoverChecklistPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${CANONICAL}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    image: HERO_IMAGE,
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
    about: [
      {
        "@type": "Service",
        name: "Vacation Rental Cleaning",
        url: `${site.url}/services/vacation-rental-cleaning`,
      },
      {
        "@type": "City",
        name: "Kissimmee",
        sameAs: "https://en.wikipedia.org/wiki/Kissimmee,_Florida",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Same-day Airbnb turnover timeline for Kissimmee vacation rentals",
    description:
      "Checkout-to-ready handoff steps for Kissimmee short-term rental turnovers.",
    totalTime: "PT150M",
    step: [
      {
        "@type": "HowToStep",
        name: "Checkout +15 min",
        text: "Confirm access; walk review-risk rooms; start laundry if on-site machines are part of SOP.",
      },
      {
        "@type": "HowToStep",
        name: "Core clean",
        text: "Bathrooms → kitchen → beds → floors → living → outdoor.",
      },
      {
        "@type": "HowToStep",
        name: "Reset",
        text: "Remake beds; restock pars; set thermostat/lights per house rules.",
      },
      {
        "@type": "HowToStep",
        name: "Photo QA",
        text: "Wide shots of each bath, kitchen, every bed, living, and outdoor seating.",
      },
      {
        "@type": "HowToStep",
        name: "Handoff",
        text: "Message host/PM ready with photo link and any maintenance flags.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${site.url}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Airbnb Turnover Checklist Kissimmee",
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <article>
        <section className="relative min-h-[48vh] overflow-hidden bg-ink text-white sm:min-h-[54vh]">
          <Image
            src={HERO_IMAGE}
            alt="Guest-ready vacation rental bedroom in Kissimmee after Airbnb turnover cleaning"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
          <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:min-h-[54vh] sm:px-6 sm:pb-16 lg:px-8">
            <nav
              className="text-sm font-semibold text-[#9fddd5]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2 text-white/40">/</span>
              <Link href="/guides" className="hover:text-white">
                Guides
              </Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Airbnb Turnover Checklist</span>
            </nav>
            <h1 className="font-display mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">
              {TITLE}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              A repeatable same-day checklist for hosts and property managers
              near Kissimmee, Celebration, and the US-192 / I-4 vacation
              corridor.
            </p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-ink">
              What Is an Airbnb Turnover Clean in Kissimmee?
            </h2>
            <p className="ai-overview-target mt-5 rounded-2xl border border-line bg-paper p-5 text-lg leading-relaxed text-ink-soft sm:p-6">
              {DIRECT_ANSWER}
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              This guide is for hosts and property managers who need a
              repeatable checklist—not a vague “tidy the house” note for a
              friend.
            </p>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              Typical Turnover Time by Unit Size
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[36rem] text-left text-sm text-ink-soft">
                <thead className="bg-paper text-xs font-bold uppercase tracking-wide text-ink">
                  <tr>
                    <th className="px-5 py-4">Unit type</th>
                    <th className="px-5 py-4">
                      Target minutes (stocked linens on site)
                    </th>
                    <th className="px-5 py-4">Most common delay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      Studio / 1BR condo
                    </td>
                    <td className="px-5 py-4">~75</td>
                    <td className="px-5 py-4">Late guest checkout</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      2BR apartment / townhome
                    </td>
                    <td className="px-5 py-4">~105</td>
                    <td className="px-5 py-4">Linen shortage mid-turn</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      3BR+ SFR / villa
                    </td>
                    <td className="px-5 py-4">~150</td>
                    <td className="px-5 py-4">
                      Outdoor / pool-adjacent residue
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted">
              Times assume keys/codes work, dishwasher is empty or runnable, and
              replacement linens are staged. Add buffer when check-in is under 4
              hours after checkout.
            </p>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              Room-by-Room Kissimmee Turnover Checklist
            </h2>

            <h3 className="font-display mt-10 text-2xl font-semibold text-ink">
              Bathrooms (highest review risk)
            </h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Wipe and disinfect vanity, faucet, shower/tub, toilet (bowl,
                seat, base, behind).
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Clear glass doors and mirrors; spot grout mildew—Central Florida
                humidity shows fast between guests.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Empty under-sink trash; restock toilet paper, hand soap, and bath
                towels to par.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Sweep/mop floors; check hair in drains and behind toilet.
              </li>
            </ul>

            <h3 className="font-display mt-10 text-2xl font-semibold text-ink">
              Kitchen
            </h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Clear counters; wipe appliance handles, fridge exterior,
                microwave interior if crumbs visible.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Run or empty dishwasher per house rules; restock dishwasher pods
                if provided.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Clean coffee station (grounds, drip tray); wipe sticky high
                chairs / bar stools.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Empty trash and recycling; replace liners; spot-check pantry
                floor for spills.
              </li>
            </ul>

            <h3 className="font-display mt-10 text-2xl font-semibold text-ink">
              Bedding &amp; sleep zones
            </h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Strip all beds (including pull-outs and bunks); remake with clean
                sheets and pillowcases.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Confirm mattress protectors are dry and intact.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Fluff or replace duvet covers per property SOP; vacuum under beds
                when hair or crumbs visible.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Stage spare set only if inventory allows—do not leave stained
                linens “for laundry later” in guest view.
              </li>
            </ul>

            <h3 className="font-display mt-10 text-2xl font-semibold text-ink">
              Living areas &amp; floors
            </h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Dust TV stands and remotes; wipe sticky coffee tables (kids’
                vacation homes get heavy use).
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Vacuum carpets; mop hard floors; spot pet hair if the listing
                allows pets.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Reset sofa cushions and throw pillows; fold blankets.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Check closets/entry for forgotten guest items; bag and label for
                the host.
              </li>
            </ul>

            <h3 className="font-display mt-10 text-2xl font-semibold text-ink">
              Outdoor / lanai / pool-adjacent (Kissimmee-specific)
            </h3>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Wipe outdoor tables and chairs; remove sticky drink residue.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Sweep lanai and entry mats; remove leaf litter that tracks
                indoors.
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Spot pool-deck furniture film when in scope (confirm with
                host—full pool service is separate).
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Empty outdoor trash if the property includes it in the clean
                scope.
              </li>
            </ul>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              Where Kissimmee Guests Leave Reviews (and Points to Protect)
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[36rem] text-left text-sm text-ink-soft">
                <thead className="bg-paper text-xs font-bold uppercase tracking-wide text-ink">
                  <tr>
                    <th className="px-5 py-4">Zone</th>
                    <th className="px-5 py-4">
                      Share of common STR complaints (industry pattern)
                    </th>
                    <th className="px-5 py-4">Local focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line bg-white">
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      Bathrooms
                    </td>
                    <td className="px-5 py-4">~38%</td>
                    <td className="px-5 py-4">
                      Grout mildew, glass doors, under-sink cabinets
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      Kitchens
                    </td>
                    <td className="px-5 py-4">~22%</td>
                    <td className="px-5 py-4">
                      Handles, coffee stations, trash odor
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">Bedding</td>
                    <td className="px-5 py-4">~18%</td>
                    <td className="px-5 py-4">
                      Protectors, pillowcases, sofa beds
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      Outdoor / lanai
                    </td>
                    <td className="px-5 py-4">~12%</td>
                    <td className="px-5 py-4">
                      Sticky tables, tracked pool water
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-semibold text-ink">
                      Hidden zones
                    </td>
                    <td className="px-5 py-4">~10%</td>
                    <td className="px-5 py-4">
                      Under beds, closet floors, AC vents
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 leading-relaxed text-muted">
              Protect bathrooms and bedding first when time is short. A rushed
              living-room fluff will not save a mildew shower review.
            </p>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              Linen and Consumable Par Levels
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Keep at least{" "}
              <strong className="font-semibold text-ink">
                2 full sets of sheets and towels per bed configuration
              </strong>{" "}
              on site (one on beds, one clean staged). Theme-park turnovers fail
              more often from linen shortages than from mop technique.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Suggested consumable pars for a typical 3BR Kissimmee villa:
            </p>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Toilet paper: 1–2 rolls visible per bath + backup under sink
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Paper towels / trash bags: enough for one full guest stay
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Dishwasher pods / sponge: 2–3 uses
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Hand soap / shampoo / body wash: half-full minimum or sealed
                hospitality bottles
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-muted">
              Document missing inventory in the turnover photo set so the next
              clean is not blamed for host restock gaps.
            </p>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              Same-Day Timeline &amp; Photo Handoff
            </h2>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-muted">
              <li>
                <strong className="font-semibold text-ink">
                  Checkout +15 min:
                </strong>{" "}
                Confirm access; walk review-risk rooms; start laundry if on-site
                machines are part of SOP.
              </li>
              <li>
                <strong className="font-semibold text-ink">Core clean:</strong>{" "}
                Bathrooms → kitchen → beds → floors → living → outdoor.
              </li>
              <li>
                <strong className="font-semibold text-ink">Reset:</strong> Remake
                beds; restock pars; set thermostat/lights per house rules.
              </li>
              <li>
                <strong className="font-semibold text-ink">Photo QA:</strong> Wide
                shots of each bath, kitchen, every bed, living, and outdoor
                seating. Timestamped photos protect hosts and cleaners.
              </li>
              <li>
                <strong className="font-semibold text-ink">Handoff:</strong>{" "}
                Message host/PM “ready” with photo link and any maintenance flags
                (leaks, broken AC, missing crib).
              </li>
            </ol>
            <p className="mt-4 leading-relaxed text-muted">
              When check-in is same afternoon, tell the host early if checkout
              was late—do not silently compress the checklist.
            </p>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              When to Book Cleaning Kissimmee for Vacation Rentals
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Book professional{" "}
              <Link
                href="/services/vacation-rental-cleaning"
                className="font-semibold text-fresh hover:text-fresh-deep"
              >
                vacation rental cleaning
              </Link>{" "}
              when you need:
            </p>
            <ul className="mt-4 space-y-3 text-muted">
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Reliable same-day turns during peak Disney seasons
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Consistent bathroom/bedding standards across multiple units
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Deep resets after long guest stays or pet stays (
                <Link
                  href="/services/deep-cleaning"
                  className="font-semibold text-fresh hover:text-fresh-deep"
                >
                  deep cleaning
                </Link>
                )
              </li>
              <li className="flex gap-3 border-t border-line pt-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-fresh" />
                Move-related empties between owners (
                <Link
                  href="/services/move-in-move-out"
                  className="font-semibold text-fresh hover:text-fresh-deep"
                >
                  move-in / move-out
                </Link>
                )
              </li>
            </ul>
            <p className="mt-6 leading-relaxed text-muted">
              Request a{" "}
              <Link
                href="/quote"
                className="font-semibold text-fresh hover:text-fresh-deep"
              >
                quote
              </Link>{" "}
              or{" "}
              <Link
                href="/book"
                className="font-semibold text-fresh hover:text-fresh-deep"
              >
                book
              </Link>{" "}
              with beds/baths, turnover window, and whether linens are on site.
              Cleaning Kissimmee routes bookings through Booking Broom for
              scheduling and confirmation. Learn more{" "}
              <Link
                href="/about"
                className="font-semibold text-fresh hover:text-fresh-deep"
              >
                about us
              </Link>{" "}
              or browse all{" "}
              <Link
                href="/services"
                className="font-semibold text-fresh hover:text-fresh-deep"
              >
                services
              </Link>
              .
            </p>

            <h2 className="font-display mt-14 text-3xl font-semibold text-ink">
              FAQ
            </h2>
            <div className="mt-8 space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-t border-line pt-6">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    {faq.question.includes("vs regular") ? (
                      <>
                        Turnovers emphasize bedding change-outs, bathroom
                        disinfection, trash, restock pars, and photo QA on a
                        tight clock. Recurring residential cleans focus on
                        maintenance soil between longer gaps—see{" "}
                        <Link
                          href="/services/recurring-cleaning"
                          className="font-semibold text-fresh hover:text-fresh-deep"
                        >
                          recurring cleaning
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/services/residential-cleaning"
                          className="font-semibold text-fresh hover:text-fresh-deep"
                        >
                          residential cleaning
                        </Link>
                        .
                      </>
                    ) : faq.question.includes("deep clean") ? (
                      <>
                        Yes. Schedule{" "}
                        <Link
                          href="/services/deep-cleaning"
                          className="font-semibold text-fresh hover:text-fresh-deep"
                        >
                          deep cleaning
                        </Link>{" "}
                        after heavy summer or holiday occupancy to reset grout,
                        baseboards, and neglected outdoor-adjacent floors.
                      </>
                    ) : (
                      faq.answer
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-16 text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Book a Kissimmee vacation rental turnover
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Share beds, baths, turnover window, and linen status—we’ll confirm
              a same-day or next-day slot for your listing.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/quote">Get a free quote</Button>
              <Button href="/book" variant="ghost">
                Book online
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/55">
              Or call{" "}
              <a href={site.phoneHref} className="text-[#9fddd5] hover:text-white">
                {site.phone}
              </a>
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
