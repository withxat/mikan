import { siteConfig } from '@/site.config.ts'

// Only root-relative URLs need the deployment prefix. Leave external and relative URLs intact.
export function withBase(path: string): string {
	if (!path.startsWith('/') || path.startsWith('//'))
		return path

	const base = siteConfig.base.replace(/\/$/, '')
	if (base && (path === base || path.startsWith(`${base}/`)))
		return path

	return `${base}${path}`
}

export function absoluteUrl(path: string): URL {
	return new URL(withBase(path), siteConfig.url)
}
