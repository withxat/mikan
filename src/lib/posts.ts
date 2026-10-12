interface PublishablePost {
	data: { date: Date, draft: boolean }
	id: string
}

// Keep the home page, archive, static routes, and feed in agreement.
export function publishedPosts<T extends PublishablePost>(posts: T[], now = new Date()): T[] {
	return posts
		.filter(post => !post.data.draft && post.data.date <= now)
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id))
}

export function postUrl(id: string): string {
	return `/post/${encodeURIComponent(id)}`
}
