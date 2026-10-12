# Mikan 🍊

A warm, minimal blog starter for your little corner of the internet. Built with Astro 7, Tailwind CSS 4, and MDX. Adapted from Xat's personal site, with the original orange palette, paper edge, dark mode, and gentle interactions.

![Mikan desktop preview](./docs/preview.png)

## Start here

Use Node.js **24 LTS** (see `.nvmrc`) and **pnpm 10.33.0**. Node 22.18+ is also supported.

```sh
# After cloning or downloading this repository:
npm install --global pnpm@10.33.0
pnpm install
pnpm dev
```

Open the local URL printed by Astro, normally `http://localhost:4321`.

1. Edit `src/site.config.ts`: set your production URL, name, language, introduction, and links.
2. Replace the example posts in `contents/posts/`.
3. Update `contents/projects.json`, or set `projects.enabled` to `false`.
4. Replace `public/favicon.svg` and adjust the colors in `src/styles/globals.css`.
5. Run the checks below, then deploy `dist/`.

No API keys, database, external font service, or analytics account are required. The generated social image follows your site name, tagline, and hostname automatically. Set `ogImage` to a file in `public/` if you prefer your own design.

## Features

- Responsive home page, category archive, individual posts, and a 404 page.
- Markdown and MDX, syntax highlighting, Chinese typography plugins, and MDX image lightboxes.
- Draft and future-date filtering shared by all public surfaces.
- RSS summaries, canonical URLs, Open Graph metadata, sitemap, and robots.txt.
- Optional projects and social links, configured in one place.
- System dark mode and reduced-motion support. Content stays visible without JavaScript.
- Self-hosted open-source Fugaz One heading font and a system monospace body font.
- Static output for Netlify, Vercel, or any ordinary static host.

## Configuration

`src/site.config.ts` is the source of truth for identity and metadata. In particular, replace `https://example.com` with your real origin before deployment: it controls RSS, canonical URLs, the sitemap, and sharing images. This starter is designed to deploy at the root of a domain, not a subdirectory.

| Setting | Purpose |
| --- | --- |
| `url` | Production origin, such as `https://your-domain.com` |
| `name`, `title`, `description` | Header, browser title, and metadata |
| `author`, `lang` | Author credit and HTML language, such as `zh-CN` |
| `tagline`, `hero`, `intro` | Home page text |
| `socials` | Links such as `{ label: 'Email', href: 'mailto:you@example.com' }` |
| `projects.enabled`, `projects.moreUrl` | Toggle projects; optionally link to a full portfolio |
| `postsPerPage` | Number of recent posts shown on the home page |
| `footer`, `ogImage` | Footer text and sharing image path |

Setting `lang` changes the document language. Translate the small UI labels in the components if you want a fully localized interface.

## Write a post

Create a `.md` or `.mdx` file directly in `contents/posts/`. Use a lowercase, hyphenated filename: `hello-world.mdx` becomes `/post/hello-world`. Nested post directories are not supported; image subdirectories are fine.

```yaml
---
title: Hello, world
date: 2026-01-01
summary: A short introduction for the home page and RSS feed.
category: notes
tags: [hello, writing]
draft: false
---
```

`title`, `date`, `summary`, and `category` are required. `tags` defaults to an empty array; `draft` defaults to `false`. Categories must reference an `id` in `contents/categories.json`.

A post with `draft: true` or a future `date` has no public page and is excluded from the home page, archive, RSS, and sitemap. Dates are interpreted in UTC; use an ISO timestamp with a timezone if you need precise scheduling. Publication happens at **build time**, so trigger a new deployment after the date arrives. Draft source files remain visible to anyone who can access your repository.

Put local images under `contents/posts/image/`:

```md
![Describe the image](./image/landscape.png "An optional caption")
```

Use `.mdx` for the custom image viewer, callouts, code-block styling, and imported Astro components. Plain `.md` uses Astro's standard Markdown renderer. The feed deliberately publishes **summaries with links** so MDX imports and components never leak into a reader.

Delete the starter examples, including `draft-example.mdx`, when you add your own writing. An empty blog or empty projects list is supported.

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Generate the static site in `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Check code style |
| `pnpm lint:fix` | Apply ESLint fixes |
| `pnpm typecheck` | Check TypeScript and Astro components |
| `pnpm test` | Test publication rules and post URLs |
| `pnpm test:build` | Check an existing build for metadata, feed consistency, and broken links |

Before committing:

```sh
pnpm lint:fix
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:build
```

GitHub Actions runs these checks on pushes and pull requests. Lefthook formats staged source files and checks types before a commit.

## Deploy

**Netlify:** import your repository. `netlify.toml` supplies Node 24, `pnpm build`, and the `dist` publish directory.

**Vercel:** import as an Astro project; use `pnpm build` and `dist`. The included `vercel.json` keeps URLs without trailing slashes.

**Other static hosts:** run `pnpm install --frozen-lockfile && pnpm build`, then upload `dist/`. Configure the host to serve `404.html` for missing routes. No server adapter is needed.

## Project map

```text
contents/
  categories.json       Category IDs and descriptions
  projects.json         Optional portfolio items
  posts/                Markdown / MDX and local images
src/
  site.config.ts        Your site identity
  content.config.ts     Validated content schemas
  components/           Reusable UI and MDX components
  layouts/              Shared page layouts and metadata
  lib/posts.ts          Shared publication rules
  pages/                Pages, RSS, robots, and social image
  styles/globals.css    Theme colors and typography
public/                 Static files copied to the output
```

## Dependency notes

Astro 7 uses a new Markdown pipeline by default. This starter explicitly uses `@astrojs/markdown-remark` to retain the CJK remark plugins, as described in the [Astro migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/).

TypeScript stays on 6.0.x because the current ESLint parser does not support TypeScript 7 yet. Astro Check's Chokidar dependency is overridden to v5 for the supported Node versions; the existing pnpm provenance policy rejects its old v4.0.3 dependency.

The original Calling Code font and personal media are not distributed in this starter. Fugaz One is delivered by `@fontsource/fugaz-one` with its bundled OFL license. Review and choose a repository license before publishing your own reusable distribution; this change does not assign a new license to the original project's code.

<details>
<summary>Mobile dark mode preview</summary>

<img src="./docs/mobile-dark.png" alt="Mikan in dark mode on a narrow screen" width="320" />

</details>
