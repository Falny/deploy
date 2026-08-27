export type ItemState = {
	values: {
		imgMain: string
		title: string
		price: string
		oldPrice: string
		sale: boolean
		new: boolean
		images: string[]
		category: string[]
		light: string[]
		color: string[]
		format: string[]
		structure: string[]
	}
	errors: {
		price: string
		oldPrice: string
	}
}

export type GoodType = {
	mainImg: string
	name: string
	price: number
	oldPrice: number
	sale: boolean
	newGood: boolean
	images: string[]
	structure: string[]
	format: string[]
	color: string[]
	light: string[]
	category: string[]
}
