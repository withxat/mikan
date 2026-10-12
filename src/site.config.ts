import process from 'node:process'

interface SiteConfig {
	author: string
	base: string
	description: string
	footer: string
	hero: string
	intro: string[]
	lang: string
	name: string
	ogImage: string
	postsPerPage: number
	projects: { enabled: boolean, moreUrl?: string }
	socials: { href: string, label: string }[]
	tagline: string
	title: string
	url: string
}

// Start here: this configuration drives the pages, metadata, RSS, and sitemap.
export const siteConfig: SiteConfig = {
	author: 'Your Name',
	base: process.env.BASE_PATH || '/',
	description: 'Notes on making things, learning slowly, and noticing the everyday.',
	footer: 'Made with care. Powered by Astro.',
	hero: 'Small thoughts, bright ideas.',
	intro: [
		'🍊 Hello, welcome to my little corner of the internet.',
		'I write about the things I make, the things I learn, and the details I want to remember.',
		'Take a look around. There is always something growing here.',
	],
	lang: 'en',
	name: 'mikan',
	ogImage: '/og-image.png',
	postsPerPage: 4,
	projects: { enabled: true },
	socials: [{ href: '/feed.xml', label: 'RSS' }],
	tagline: 'A personal notebook',
	title: 'mikan — A little space on the web',
	url: process.env.SITE_URL || 'https://example.com',
}
