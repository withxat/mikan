import { xat } from '@withxat/eslint-config'

export default xat({
	tailwindcss: {
		overrides: {
			// JavaScript interaction hooks, not Tailwind utilities.
			'better-tailwindcss/no-unknown-classes': ['error', { ignore: ['^pressable$', '^motion-sticker$'] }],
		},
	},
	test: { overrides: { 'test/no-import-node-test': 'off' } },
}, {
	// These files also run in Node, outside Astro's alias resolver.
	files: ['astro.config.ts', 'tests/**/*.ts'],
	rules: { 'paths/import-alias': 'off' },
})
