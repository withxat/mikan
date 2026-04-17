import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import compresser from 'astro-compressor'
import { defineConfig, fontProviders } from 'astro/config'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough'

export default defineConfig({
	fonts: [{
		cssVariable: '--font-fugaz-one',
		name: 'fugaz-one',
		options: {
			variants: [{
				src: ['./src/assets/font/fugaz-one-regular-subset.woff2'],
				style: 'normal',
				weight: 'normal',
			}],
		},
		provider: fontProviders.local(),
	}, {
		cssVariable: '--font-calling-code',
		fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New'],
		name: 'calling-code',
		options: {
			variants: [{
				src: ['./src/assets/font/calling-code-regular.woff2'],
				style: 'normal',
				weight: 'normal',
			}, {
				src: ['./src/assets/font/calling-code-italic.woff2'],
				style: 'italic',
				weight: 'normal',
			}, {
				src: ['./src/assets/font/calling-code-bold.woff2'],
				style: 'normal',
				weight: 'bold',
			}, {
				src: ['./src/assets/font/calling-code-bold-italic.woff2'],
				style: 'italic',
				weight: 'bold',
			}],
		},
		provider: fontProviders.local(),
	}],
	integrations: [
		partytown(),
		sitemap(),
		mdx(),
		compresser(),
	],
	markdown: {
		gfm: true,
		remarkPlugins: [
			remarkCjkFriendly,
			remarkCjkFriendlyGfmStrikethrough,
		],
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
			themes: {
				dark: 'catppuccin-mocha',
				light: 'catppuccin-latte',
			},
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
		],
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	},
})
