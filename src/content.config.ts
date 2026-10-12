import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'

const blog = defineCollection({
	loader: glob({ base: './contents/posts', pattern: '*.{md,mdx}' }),
	schema: z.object({
		category: reference('categories'),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
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
		link: z.url(),
		title: z.string(),
	}),
})

export const collections = { blog, categories, projects }
