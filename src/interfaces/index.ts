interface Emoji {
	category: string
	keywords: string[]
	name: string
	order: number
	unified: string
	emoji: string
}

interface Category {
	key: string
	name: string
	emoji?: string
}

export {
	Emoji,
	Category
}