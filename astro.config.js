import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import font from 'vite-plugin-font'

export default defineConfig({
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
