# Volaired

## What This Is

Volaired is a travel-planning web app that combines flight discovery, trip organization, collaboration surfaces, and an assistant-style chat flow. The repo includes authenticated app routes, trip creation flows, search-oriented UI, and a streaming chat endpoint rather than just a landing page.

The current UI is branded as Radiair in parts of the app. The repo name stayed Volaired while the product direction and interface evolved.

## Preview

![Volaired landing page](./docs/assets/volaired-hero.png)

![Volaired trip dashboard](./docs/assets/volaired-trips.png)

![Volaired create trip flow](./docs/assets/volaired-create-trip.png)

## What Works

- Landing and marketing pages
- Sign-in, password recovery, profile setup, and auth callback routes
- Flight search UI with filters, mocked result rendering, and airport/date state handling
- Trip pages, trip creation flow, and trip detail routes
- Streaming chat endpoint under `/api/chat`
- Search-oriented components and Supabase-backed app plumbing

## How It's Built

- Next.js + TypeScript app-router project
- Supabase auth/server utilities under `src/lib/supabase`
- Route groups for auth, default app surfaces, and no-footer trip flows
- Search and UI primitives across `src/components`
- AI SDK chat route in [src/app/api/chat/route.ts](./src/app/api/chat/route.ts)

## Technical Notes

- The repo goes beyond a single marketing page: it has separate route groups for auth, flight search, trip creation, and trip detail experiences.
- Flight search currently uses mocked result data in the UI layer, which makes the search and sorting interactions reviewable without requiring a live flight-provider integration.
- The assistant layer is implemented as a streaming route rather than static copy, which makes the repo more useful as a product/system prototype.

## Proof of Work

- Marketing screenshot assets in [docs/assets](./docs/assets)
- Product-specific demo images in `public/flight_search_demo_light.webp`, `public/copilot_chat.webp`, and `public/collab_iphone_light.webp`

- Implemented routes include `/(default)/flights/search`, `/(no-footer)/trips/create`, `/(no-footer)/trips/[uuid]`, and `api/chat`

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Some flows expect public Supabase and Algolia environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ALGOLIA_APPLICATION_ID=
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=
```
