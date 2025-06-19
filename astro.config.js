import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import compresser from 'astro-compressor'
import { defineConfig } from 'astro/config'
import font from 'vite-plugin-font'

export default defineConfig({
	integrations: [
		partytown(),
		sitemap(),
		mdx(),
		compresser(),
	],
	markdown: {
		shikiConfig: {
			langAlias: {
				eslint: 'typescript',
				git: 'shell',
				github: 'yaml',
				ignore: 'plaintext',
				license: 'plaintext',
				nest: 'typescript',
				pnpm: 'shell',
				react: 'tsx',
				robot: 'plaintext',
				tailwind: 'css',
			},
			theme: 'catppuccin-latte',
		},
	},
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true,
	},
	site: 'https://xat.sh',
	trailingSlash: 'never',
	vite: {
		plugins: [
			tailwindcss(),
			font.vite(),
		],
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	},
})
