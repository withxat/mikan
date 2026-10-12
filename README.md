# mikan 🍊

[English](README.md) | [简体中文](README.zh-CN.md)

[Live demo](https://mikan.xat.sh/)

A warm, minimal blog template built with Astro, Tailwind CSS, and MDX. A little space for your writing, projects, and everyday discoveries.

Adapted from [Xat](https://github.com/withxat)'s personal website, with an orange palette, a paper edge, and gentle interactions.

![mikan desktop preview](./docs/preview.png)

<details>
<summary>Mobile dark mode</summary>

<img src="./docs/mobile-dark.png" alt="mikan in dark mode on a narrow screen" width="320" />

</details>

## Features

- **Writing first.** Home page, category archive, individual posts, and a custom 404 page.
- **Markdown and MDX.** Syntax highlighting, Chinese typography support, and image lightboxes in MDX posts.
- **One configuration file.** Site identity, introduction, social links, and an optional projects section.
- **Ready to share.** RSS summaries, canonical URLs, Open Graph metadata, a generated social image, sitemap, and robots.txt.
- **A comfortable reading experience.** Responsive layouts, system dark mode, and reduced-motion support. Content remains readable without JavaScript.
- **Static output.** Deploy to Netlify, Vercel, or any static host. No database, API keys, or analytics account required.

## Quick start

Use **Node.js 24 LTS** and **pnpm 10.33.0**. The minimum supported Node.js version is 22.18.0; `.nvmrc` selects Node 24.

After cloning or downloading the repository:

```sh
npm install --global pnpm@10.33.0
pnpm install
pnpm dev
```

Open the URL printed by Astro, normally `http://localhost:4321`.

1. Edit `src/site.config.ts` with your name, introduction, links, and production URL.
2. Replace the examples in `contents/posts/` with your own writing.
3. Update `contents/projects.json`, or set `projects.enabled` to `false`.
4. Replace `public/favicon.svg` and adjust the colors in `src/styles/globals.css`.
5. Run the checks below and deploy the generated `dist/` directory.

## Make it yours

All site identity settings live in [`src/site.config.ts`](./src/site.config.ts).

| Setting | Purpose |
| --- | --- |
| `url` | Production origin, such as `https://your-domain.com` |
| `base` | Deployment path, `/` by default; set automatically by the GitHub Pages workflow |
| `name`, `title`, `description` | Site name, browser title, and description |
| `author`, `lang` | Author credit and HTML language, such as `zh-CN` |
| `tagline`, `hero`, `intro` | Home page text |
| `socials` | Social links, email, and RSS |
| `projects.enabled`, `projects.moreUrl` | Show the projects section and optionally link to a full portfolio |
| `postsPerPage` | Number of recent posts on the home page |
| `footer`, `ogImage` | Footer text and sharing image path |

Replace `https://example.com` with your production origin before deployment. It controls canonical URLs, RSS, the sitemap, and the generated sharing image. For a subdirectory deployment, set `base` (or the `BASE_PATH` build environment variable), for example `/mikan`.

The default sharing image follows your site name, tagline, and hostname. To use your own image, put it in `public/` and update `ogImage`.

`lang` sets the document language. For a fully localized site, also translate the interface labels in `src/components/` and `src/pages/`.

### Social links

```ts
socials: [
  { href: 'https://github.com/your-name', label: 'GitHub' },
  { href: 'mailto:you@example.com', label: 'Email' },
  { href: '/feed.xml', label: 'RSS' },
]
```

An empty `socials` array hides the social navigation. An empty projects list hides the projects section.

## Write a post

Create a `.md` or `.mdx` file directly in `contents/posts/`. A file named `hello-world.mdx` becomes `/post/hello-world`. Nested post directories are not supported; image subdirectories are fine.

```md
---
title: Hello, world
date: 2026-01-01
summary: A short introduction for the home page and RSS feed.
category: notes
tags: [hello, writing]
draft: false
---

## A small beginning

Write something worth remembering.
```

`title`, `date`, `summary`, and `category` are required. `tags` defaults to an empty array; `draft` defaults to `false`. The category must match an `id` in `contents/categories.json`.

### Drafts and scheduled posts

Posts with `draft: true` or a future `date` are excluded from the home page, archive, RSS, sitemap, and generated article pages.

Publication happens at build time. Rebuild or redeploy after the date arrives. Date-only values use UTC; use an ISO timestamp with an explicit timezone when you need a precise publication time. Draft source files remain visible to anyone with access to the repository.

Delete the starter posts, including `draft-example.mdx`, when you are ready. An empty blog is supported.

### Images and MDX

Keep local images in `contents/posts/image/` and reference them with a relative path:

```md
![Describe the image](./image/landscape.png "An optional caption")
```

Use `.mdx` for the custom image viewer, quote and code-block styles, or imported Astro components. Plain `.md` uses Astro's standard Markdown renderer.

The RSS feed publishes summaries with links to the full articles, so MDX imports and components do not appear in feed readers.

## Development

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the static site in `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Check code style |
| `pnpm lint:fix` | Apply ESLint fixes |
| `pnpm typecheck` | Check TypeScript and Astro components |
| `pnpm test` | Test publication rules and post URLs |
| `pnpm test:build` | Check the existing build for metadata, feed consistency, and broken links |

Before committing:

```sh
pnpm lint:fix
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:build
```

GitHub Actions runs lint, type checks, tests, and a production build on pushes and pull requests. Lefthook fixes staged source files and checks Astro or TypeScript changes before a commit. Commit messages follow Conventional Commits.

## Deployment

| Host | Setup |
| --- | --- |
| GitHub Pages | In **Settings → Pages**, select **GitHub Actions** as the source, then push to `main` or run **Deploy demo** manually. |
| Netlify | Import the repository. `netlify.toml` sets Node 24, `pnpm build`, and the `dist` publish directory. |
| Vercel | Import as an Astro project with `pnpm build` and `dist`. `vercel.json` configures URLs without trailing slashes. |
| Other static hosts | Run `pnpm install --frozen-lockfile && pnpm build`, then upload `dist/`. Serve `404.html` for missing routes. |

No server adapter is needed. Set your production URL in `src/site.config.ts` before building.

For a hosted demo, you can set the `SITE_URL` build environment variable instead. It overrides the URL in `src/site.config.ts` so canonical URLs, RSS, and the sitemap point to the deployed site.

The [live demo](https://mikan.xat.sh/) uses GitHub Pages. Source code stays on `main`; the **Deploy demo** workflow builds and checks the site, commits only the generated static files to the `mikan` branch, and publishes the same files to Pages. It reads the deployment origin and base path from GitHub, so a new repository name or custom domain does not need a workflow edit.

Root-relative links in Markdown and MDX, such as `[Welcome](/post/welcome)`, follow the configured base path. Use `withBase()` from `src/lib/urls.ts` for internal links in custom Astro components.

## Project structure

```text
contents/
  categories.json       Category IDs and descriptions
  projects.json         Optional portfolio items
  posts/                Markdown, MDX, and local images
src/
  site.config.ts        Site identity and home page configuration
  content.config.ts     Content schemas
  components/           UI and MDX components
  layouts/              Page layouts and metadata
  lib/posts.ts          Shared publication rules
  pages/                Pages, RSS, robots.txt, and the sharing image
  styles/globals.css    Theme colors and typography
public/                 Files copied directly to the build
```

## Technical notes

- Astro 7, Tailwind CSS 4, and Motion 14 power the template.
- `@astrojs/markdown-remark` keeps the CJK remark plugins working with Astro 7.
- TypeScript stays on 6.0.x for compatibility with the current ESLint parser.
- Astro Check uses Chokidar 5 through a scoped override. Its old v4.0.3 dependency is rejected by the project's pnpm provenance policy.
- The heading font is self-hosted Fugaz One from `@fontsource/fugaz-one`, distributed under the OFL. Body text uses the system monospace font.

## Author

**mikan** © [Xat](https://github.com/withxat).<br>
Authored and maintained by Xat with help from contributors ([list](https://github.com/withxat/mikan/graphs/contributors)).

> [Blog](https://blog.xat.sh) · GitHub [@withxat](https://github.com/withxat) · Telegram [@withxat](https://t.me/withxat) · X [@withxat](https://x.com/withxat) · Email [i@xat.sh](mailto:i@xat.sh)
