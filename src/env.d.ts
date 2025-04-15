declare module '@xat/font' {
	export const css: {
		display: string
		family: string
		style: string
		weight: string
	}
}

declare module '*.ttf' {
	export * from '@xat/font'
}

declare module '*.otf' {
	export * from '@xat/font'
}

declare module '*.ttf?subsets' {
	export * from '@xat/font'
}

declare module '*.otf*?subsets' {
	export * from '@xat/font'
}
