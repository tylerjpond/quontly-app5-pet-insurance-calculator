# Pet Insurance Comparison Guide

This project is a SvelteKit refactor of the Quontly pet insurance calculator. It preserves the existing recommendation logic and supporting content pages while adopting the DaisyUI-based Quontly styling system from the calorie calculator reference app.

## Stack

- SvelteKit
- Svelte 5
- TypeScript
- Tailwind CSS 4
- DaisyUI 5
- Zod

## Scripts

- `npm run dev` starts the local development server.
- `npm run check` runs `svelte-check` with SvelteKit sync.
- `npm run lint` runs ESLint for TypeScript and config files.
- `npm run build` creates the prerendered static site in `build/`.
- `npm run preview` previews the production build locally.

## Structure

- `src/routes/+page.svelte` contains the main calculator flow.
- `src/routes/+layout.svelte` provides the shared Quontly shell.
- `src/routes/about`, `privacy`, `terms`, and `disclosure` contain supporting content pages.
- `src/lib/petInsurance.ts` contains the recommendation and premium estimation logic.
- `src/lib/content/site.ts` contains structured copy and legal page content.
- `src/lib/components/BrandLogo.svelte` matches the reference project branding component.

## Notes

- The previous charting feature was intentionally removed from this migration.
- The site is configured for static prerendering with `@sveltejs/adapter-static`.
