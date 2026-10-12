import { withBase } from '@/lib/urls.ts'

interface MarkdownNode {
	children?: MarkdownNode[]
	type: string
	url?: string
}

// Apply the same deployment paths to Markdown and MDX links, images, and references.
export function remarkBasePath() {
	return function walk(node: MarkdownNode) {
		if (node.url && ['link', 'image', 'definition'].includes(node.type))
			node.url = withBase(node.url)
		node.children?.forEach(walk)
	}
}
