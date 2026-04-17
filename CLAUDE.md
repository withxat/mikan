# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog at **xat.sh**, built with Astro 6, Tailwind CSS 4, and MDX. Deployed on Netlify.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — run ESLint (uses `@withxat/eslint-config`)
- `pnpm prepare` — run `astro sync` (generates types)

Pre-commit hooks (via lefthook): ESLint with `--fix` on staged `*.{js,ts,json,yml}` files, and `tsc --noEmit` typecheck on `*.ts` files.

## Architecture

- **Content**: Blog posts live in `contents/posts/` as `.mdx` files. Categories and projects are JSON files in `contents/`. Content collections are defined in `src/content.config.ts` using Astro's `glob`/`file` loaders with Zod schemas.
- **Pages**: `src/pages/index.astro` (home), `src/pages/post/[slug].astro` (blog post), `src/pages/feed.xml.ts` (RSS).
- **Layouts**: Three layers — `root-layout.astro` (base HTML), `home-layout.astro`, `post-layout.astro`.
- **Styling**: Tailwind CSS 4 configured via `@tailwindcss/vite` plugin (not PostCSS). Global styles and custom theme in `src/styles/globals.css`. Uses `@theme inline` for design tokens (brand colors, radii, fonts). Custom variants: `has-hover`, `no-hover`, `hover-always`, `mobile-hover`.
- **Fonts**: Local fonts (Fugaz One, Calling Code) configured in `astro.config.ts` via `fontProviders.local()`.
- **Icons**: Tailwind icons plugin (`@egoist/tailwindcss-icons`) with `@iconify-json/mingcute` icon set.
- **Path alias**: `@/` maps to `./src/`.
- **TypeScript**: Extends `@withxat/tsconfig`. Shared ESLint config from `@withxat/eslint-config`.
