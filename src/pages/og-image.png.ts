import { Buffer } from 'node:buffer'

import sharp from 'sharp'

import { siteConfig } from '@/site.config'

function escapeXml(value: string): string {
	return value.replace(/[<>&"']/g, char => ({ '"': '&quot;', '&': '&amp;', '\'': '&apos;', '<': '&lt;', '>': '&gt;' })[char]!)
}

export async function GET() {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
		<rect width="1200" height="630" fill="#f48037"/>
		<rect x="48" y="48" width="1104" height="534" rx="20" fill="#fcfaf8"/>
		<circle cx="1030" cy="150" r="48" fill="#f48037"/>
		<path d="M1030 104c-4-28 30-40 48-32-4 24-20 38-48 32Z" fill="#4c9f8d"/>
		<text x="100" y="255" fill="#f48037" font-family="sans-serif" font-weight="700" font-size="76">${escapeXml(siteConfig.name.slice(0, 24))}</text>
		<text x="100" y="345" fill="#655134" font-family="sans-serif" font-size="30">${escapeXml(siteConfig.tagline.slice(0, 55))}</text>
		<path d="M100 422h1000" stroke="#d0b798" stroke-dasharray="8 8"/>
		<text x="100" y="500" fill="#655134" font-family="monospace" font-size="24">${escapeXml(new URL(siteConfig.url).hostname)}</text>
	</svg>`
	const png = await sharp(Buffer.from(svg)).png().toBuffer()
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
