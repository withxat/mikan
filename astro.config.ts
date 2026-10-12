import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import compressor from 'astro-compressor'
import { defineConfig } from 'astro/config'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough'

import { siteConfig } from './src/site.config'

export default defineConfig({
	compressHTML: true,
	integrations: [sitemap(), mdx(), compressor()],
	markdown: {
		processor: unified({
			remarkPlugins: [remarkCjkFriendly, remarkCjkFriendlyGfmStrikethrough],
		}),
		shikiConfig: { theme: 'vesper' },
	},
	prefetch: { defaultStrategy: 'viewport', prefetchAll: true },
	site: siteConfig.url,
	trailingSlash: 'never',
	vite: { plugins: [tailwindcss()] },
})
