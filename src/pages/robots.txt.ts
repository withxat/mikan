import { siteConfig } from '@/site.config'

export function GET() {
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', siteConfig.url)}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
