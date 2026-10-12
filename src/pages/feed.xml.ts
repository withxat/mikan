import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import { postUrl, publishedPosts } from '@/lib/posts'
import { absoluteUrl, withBase } from '@/lib/urls'
import { siteConfig } from '@/site.config'

export async function GET() {
	const posts = publishedPosts(await getCollection('blog'))
	return rss({
		description: siteConfig.description,
		items: posts.map(post => ({
			categories: post.data.tags,
			description: post.data.summary,
			link: absoluteUrl(postUrl(post.id)).href,
			pubDate: post.data.date,
			title: post.data.title,
		})),
		site: absoluteUrl('/'),
		stylesheet: withBase('/rss.xsl'),
		title: siteConfig.title,
		trailingSlash: false,
	})
}
