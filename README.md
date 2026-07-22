# Cleaning Kissimmee

Professional multi-page website for **Cleaning Kissimmee**, a cleaning company serving Kissimmee and nearby Central Florida.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Features

- Responsive homepage with full-bleed hero
- Dedicated pages for each service
- Multi-step **free quote** flow
- Multi-step **booking** flow (mobile-first)
- About and Contact pages

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking Broom

The booking form posts to `/api/bookings`, which forwards to Booking Broom.

Set in `.env.local`:

- `BOOKING_BROOM_URL=https://bookings.kedrik.com`
- `BOOKING_BROOM_SITE_SLUG=kissimmee`
- `BOOKING_BROOM_API_KEY=bb_kissimmee_dev_key`

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — run production server
