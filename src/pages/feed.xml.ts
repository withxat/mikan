import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

import { postUrl, publishedPosts } from '@/lib/posts'
import { siteConfig } from '@/site.config'

export async function GET() {
	const posts = publishedPosts(await getCollection('blog'))
	return rss({
		description: siteConfig.description,
		items: posts.map(post => ({
			categories: post.data.tags,
			description: post.data.summary,
			link: postUrl(post.id),
			pubDate: post.data.date,
			title: post.data.title,
		})),
		site: siteConfig.url,
		stylesheet: '/rss.xsl',
		title: siteConfig.title,
		trailingSlash: false,
	})
}
