import assert from 'node:assert/strict'
import { test } from 'node:test'

import { postUrl, publishedPosts } from '../src/lib/posts.ts'

const now = new Date('2026-06-01T00:00:00.000Z')
function post(id: string, date: string, draft = false) {
	return { data: { date: new Date(date), draft }, id }
}

test('drafts and scheduled posts cannot enter a public surface', () => {
	const entries = [
		post('draft', '2026-01-01', true),
		post('future', '2026-06-02'),
		post('published', '2026-05-31'),
		post('at-boundary', now.toISOString()),
	]
	assert.deepEqual(publishedPosts(entries, now).map(entry => entry.id), ['at-boundary', 'published'])
})

test('sorting is stable and leaves the source collection untouched', () => {
	const entries = [post('z', '2026-01-01'), post('a', '2026-01-01'), post('new', '2026-01-02')]
	assert.deepEqual(publishedPosts(entries, now).map(entry => entry.id), ['new', 'a', 'z'])
	assert.deepEqual(entries.map(entry => entry.id), ['z', 'a', 'new'])
	assert.deepEqual(publishedPosts([], now), [])
})

test('non-ASCII names and URL delimiters remain within one post path', () => {
	assert.equal(postUrl('中文笔记'), '/post/%E4%B8%AD%E6%96%87%E7%AC%94%E8%AE%B0')
	assert.equal(postUrl('hello?#'), '/post/hello%3F%23')
})
