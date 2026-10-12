import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

import { siteConfig } from '../src/site.config.ts'

const output = new URL('../dist/', import.meta.url)
const base = siteConfig.base.replace(/\/$/, '')
const read = (path: string) => readFileSync(new URL(path, output), 'utf8')
const postDirs = readdirSync(new URL('post/', output), { withFileTypes: true }).filter(entry => entry.isDirectory())
const home = read('index.html')
const feed = read('feed.xml')
const archive = read('post/index.html')
const sitemap = read('sitemap-0.xml')

function canonical(html: string) {
	return html.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/)?.[1]
}

test('all generated articles agree across archive, RSS, canonical URL, and sitemap', () => {
	for (const entry of postDirs) {
		const path = `${base}/post/${encodeURIComponent(entry.name)}`
		const html = read(`post/${entry.name}/index.html`)
		const url = canonical(html)
		assert.ok(url?.endsWith(path), `Missing canonical URL for ${path}`)
		assert.ok(archive.includes(`href="${path}"`), `Missing archive link for ${path}`)
		assert.ok(feed.includes(`<link>${url}</link>`), `Missing RSS link for ${path}`)
		assert.ok(sitemap.includes(`<loc>${url}</loc>`), `Missing sitemap link for ${path}`)
		assert.match(html, /property="article:published_time"/)
	}
	assert.equal((feed.match(/<item>/g) ?? []).length, postDirs.length)
})

test('starter does not ship the previous site identity or analytics', () => {
	for (const page of [home, feed, archive, sitemap, read('robots.txt')]) {
		const content = page.replaceAll(new URL(siteConfig.url).origin, '')
		assert.doesNotMatch(content, /xat\.sh|cloud\.umami\.is|0b3c909d-3680-47f1-88f1-ae337236d0cd/)
	}
	assert.ok(!existsSync(new URL('xat.mp3', output)))
})

test('public pages have discoverable metadata and bundled sharing assets', () => {
	const url = canonical(home)
	assert.ok(url)
	assert.equal(new URL(url).origin, new URL(siteConfig.url).origin)
	assert.ok(read('robots.txt').includes(new URL(`${base}/sitemap-index.xml`, url).href))
	assert.ok(feed.includes(`href="${base}/rss.xsl"`))
	assert.ok(home.includes(new URL(`${base}/og-image.png`, url).href))
	assert.ok(home.includes(`href="${base}/"`))
	assert.match(home, /type="application\/rss\+xml"/)
	assert.match(home, /name="description"/)
	assert.match(home, /id="main-content"/)
	assert.match(read('404.html'), /Back to home/)
	assert.ok(existsSync(new URL('favicon.svg', output)))
	assert.deepEqual([...readFileSync(new URL('og-image.png', output)).subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
})

test('every local page and image link resolves in the generated site', () => {
	const pages = ['index.html', '404.html', 'post/index.html', ...postDirs.map(entry => `post/${entry.name}/index.html`)]
	for (const page of pages) {
		for (const [, link] of read(page).matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
			assert.ok(link.startsWith(`${base}/`), `${page}: link escapes deployment base: ${link}`)
			const target = new URL(`.${decodeURIComponent(link.slice(base.length))}`, output)
			assert.ok(existsSync(target) || existsSync(join(target.pathname, 'index.html')), `${page}: broken link ${link}`)
		}
	}
})
