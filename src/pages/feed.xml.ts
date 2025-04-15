import type { APIContext } from 'astro'

import rss from '@astrojs/rss'
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

const TITLE = `Hi, Xat!`

const DESCRIPTION = `Code with Love, Exploring the World.`

export async function GET(context: APIContext) {
	const posts = await getCollection('blog')
	const items = await Promise.all(
		posts.map(async post => ({
			content: String(await processor.process(post.body)),
			description: post.data.summary,
			link: `${context.site!.origin}/post/${post.data.slug}`,
			pubDate: post.data.publishedAt,
			title: post.data.title,
		})),
	)

	const feed = rss({
		description: DESCRIPTION,
		items,
		site: context.site!.origin,
		title: TITLE,
		trailingSlash: false,
	})

	return feed
}
