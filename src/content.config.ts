import { file, glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	loader: glob({ base: './contents/posts', pattern: '**/*.md' }),
	schema: z.object({
		category: z.string(),
		publishedAt: z.date(),
		slug: z.string(),
		summary: z.string(),
		tags: z.array(z.string()),
		title: z.string(),
	}),
})

const categories = defineCollection({
	loader: file('contents/categories.json'),
	schema: z.object({
		description: z.string(),
		name: z.string(),
		slug: z.string(),
	}),
})

const projects = defineCollection({
	loader: file('contents/projects.json'),
	schema: z.object({
		description: z.string(),
		link: z.string(),
		title: z.string(),
	}),
})

export const collections = { blog, categories, projects }
