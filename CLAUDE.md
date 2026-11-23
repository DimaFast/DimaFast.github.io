# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site (Ukrainian-language) for the Verbena medical center, built with Next.js 16 (App Router), React 19, TypeScript. `next.config.ts` uses `output: 'export'` with `trailingSlash: true`, so the build emits static HTML into `out/` (no server runtime, no API routes, no `next/image` optimization). Original WordPress URLs are preserved as folder names under `app/`.

AGENTS.md warns this Next.js version differs from what you may know: read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

## Commands

- `npm run dev` — dev server (wraps `next dev` via `scripts/dev.mjs`, which maps `--host` to `--hostname`)
- `npm run build` — static export to `out/`. Use `SITE_INDEXABLE=true npm run build` for the production domain (default is `noindex`)
- `npm start` — serves `out/` via `scripts/serve.mjs`
- `npm run typecheck` — `tsc --noEmit`
- Format with Prettier (`.prettierrc.js`: no semicolons, single quotes, width 100). No linter and no test suite are configured.

`dev`, `build` and `typecheck` all first run `prepare:images` (`scripts/prepare-images.mjs`), which generates responsive WebP variants from originals in `public/media/` and writes `content/responsive-images.generated.json`. Don't hand-edit that JSON.

Requires Node >= 22. Env vars (see `.env.example`): `SITE_INDEXABLE`, and optional `NEXT_PUBLIC_BOOKING_ENDPOINT` (if empty, the contact form falls back to a `mailto:` flow).

## Architecture

- **Routes**: each page is `app/<url-slug>/page.tsx`. Parenthesized groups (`(services)`, `(doctors)`, `(blog)`, `(medical-topics)`) organize code without affecting URLs. Home, contacts, prices and about live directly in `app/`.
- **Content is data-driven**: page text lives in `content/` (`detail-pages.json`, `homepage.json`, `doctor-profiles.ts`, `service-details.ts`, `doctor-services.ts`, `pricing.ts`), not in the page files. Pages are thin and render shared components from `components/` (e.g. `content-page`, `doctor-profile`).
- **Adding a page**: add its data in `content/`, create `page.tsx` in the right group, add metadata in `lib/seo.ts`. `app/sitemap.ts` derives URLs from the content/section lists, so verify the new URL appears in the sitemap. Prices for the price list and service pages all come from `content/pricing.ts`.
- **Removed doctor**: `/sitar-lina-nikolaevna/` must return 404 and stay out of the sitemap (intentional).
- **Shared config**: `lib/clinic.ts` (contacts), `lib/site.ts`, `lib/seo.ts` (metadata, indexability).
- **Styling**: CSS Modules next to each component; `app/globals.css` holds only palette, base typography, grid and shared button/section styles. Fonts are self-hosted in `app/fonts/`.
- **Client components**: carousels (`embla-carousel-react`), the contact form (React Hook Form + zod schemas in `components/contact-form.schema.ts`), the mobile menu, and scroll-reveal animations (`motion` plus CSS). Decorative animations must respect `prefers-reduced-motion`.
- **Deploy**: `.github/workflows/deploy.yml` runs `npm ci` and `npm run build`. Production hosting notes (nginx config, SEO checklist) are in `README.md` and `docs/SEO.md`.

## Commits

Conventional Commits (`type(scope): description`), imperative, lowercase, no trailing period (see `.github/git-commit-instructions.md`).
