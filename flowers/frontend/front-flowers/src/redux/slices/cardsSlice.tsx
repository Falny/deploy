import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

type Card = {
	id: string
	mainImg: string
	name: string
	price: number
	oldPrice: number
	count?: number
	sale: boolean
	newGood: boolean
	structure: string[]
	format: string
	images: string[]
	color: string[]
	light: string
	category: string[]
}

interface CardState {
	cards: Card[]
	status: string
	error: string | undefined
}

export type FetchFilter = {
	category: string[] | string
	light: string[] | string
	color: string[] | string
	format: string[] | string
	structure: string[] | string
}

export const FetchCards = createAsyncThunk(
	'cards/fetchCards',
	async ({ category, light, color, format, structure }: FetchFilter) => {
		try {
			const { data } = await instance.get(
				`/cards?category=${category}&light=${light}&color=${color}&format=${format}&structure=${structure}`,
			)
			return data
		} catch (err) {
			throw err
		}
	},
)

const initialState: CardState = {
	cards: [],
	status: 'loading',
	error: '',
}

const CardSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(FetchCards.fulfilled, (state, action) => {
			const data = action.payload.map((obj: any) => {
				const imgMain = obj.mainImg
				let formatImgMain = ''

				if (imgMain.startsWith('iVBOR')) formatImgMain = 'image/png'
				if (imgMain.startsWith('UklGR')) formatImgMain = 'image/webp'
				else formatImgMain = 'image/jpeg'

				obj.mainImg = `data:${formatImgMain};base64,${imgMain}`

				const images = obj.images

				let imagesList = []
				for (let i = 0; i < images.length; i++) {
					if (images[i].startsWith('iVBOR')) formatImgMain = 'image/png'
					if (images[i].startsWith('UklGR')) formatImgMain = 'image/webp'
					else formatImgMain = 'image/jpeg'

					imagesList.push(`data:${formatImgMain};base64,${images[i]}`)
				}
				obj.images = imagesList
				return obj
			})
			state.cards = data
		})
	},
})

export default CardSlice.reducer
