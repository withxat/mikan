import type { APIContext } from 'astro'

import rss from '@astrojs/rss'
import { getImage } from 'astro:assets'
import { getCollection } from 'astro:content'
import rehypeFormat from 'rehype-format'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeFormat)
	.use(rehypeSanitize)
	.use(rehypeStringify)

async function replaceImage(content: string) {
	const images = content.match(/<img[^>]+src="([^"]+)"/g)
	if (!images)
		return content

	for (const img of images) {
		const match = img.match(/src="([^"]+)"/)
		if (match) {
			const img = await import(/* @vite-ignore */ `../../contents/posts${match[1].replace(/^\./, '')}`)
			const asset = await getImage({ format: 'webp', src: img.default })
			content = content.replace(match[1], asset.src)
		}
	}

	return content
}

const TITLE = `Hi, Xat!`

const DESCRIPTION = `Code with Love, Exploring the World.`

export async function GET(context: APIContext) {
	const posts = await getCollection('blog')
	const items = await Promise.all(
		posts.map(async post => ({
			content: await replaceImage(String(await processor.process(post.body))),
			description: post.data.summary,
			link: `${context.site!.origin}/post/${post.id}`,
			pubDate: post.data.date,
			title: post.data.title,
		})),
	)

	const feed = rss({
		description: DESCRIPTION,
		items,
		site: context.site!.origin,
		// stylesheet: '/rss.xsl',
		title: TITLE,
		trailingSlash: false,
	})

	return feed
}
