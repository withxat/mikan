# Project guidance

Mikan is a static blog starter built with Astro 7, Tailwind CSS 4, and MDX.

- Read `README.md` for setup, writing, configuration, and deployment.
- Keep site identity in `src/site.config.ts`; avoid hardcoded author or domain details in components.
- Use `publishedPosts()` from `src/lib/posts.ts` for every public post listing, feed, and generated route.
- Posts live directly in `contents/posts/`; category references must match `contents/categories.json` IDs.
- The Markdown pipeline is explicitly `unified()` to support CJK remark plugins.
- Fonts are self-hosted through Fontsource, with a system monospace body stack.
- TypeScript extends Astro's strict preset; `pnpm typecheck` also checks `.astro` components.
- Preserve readable content with JavaScript disabled and respect reduced-motion preferences.
- Before committing, run `pnpm lint:fix`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm test:build`.
- Use conventional commit messages. Keep unrelated user changes untouched.
