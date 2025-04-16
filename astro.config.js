import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import compresser from 'astro-compressor'
import { defineConfig } from 'astro/config'
import font from 'vite-plugin-font'

export default defineConfig({
	integrations: [partytown(), sitemap(), mdx(), compresser()],
	site: 'https://xat.sh',
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
