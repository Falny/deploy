import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

type EditItem = {
	id: string
	mainImg: string
	name: string
	price: number
	oldPrice: number
	sale: boolean
	newGood: boolean
	images: string[]
	structure: string[]
	color: string[]
	format: string[]
	light: string[]
	category: string[]
}

export const FetchGetProduct = createAsyncThunk(
	'edit/fetchGetProduct',
	async (id: string) => {
		try {
			const { data } = await instance.get(`/cards/${id}`)
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchPatchProduct = createAsyncThunk(
	'admin/fetchPatchProduct',
	async (product: EditItem) => {
		try {
			const { data } = await instance.patch(`/cards/${product.id}`, product)
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

const initialState: EditItem = {
	id: '',
	mainImg: '',
	name: '',
	price: 0,
	oldPrice: 0,
	sale: false,
	newGood: false,
	structure: [],
	images: [],
	format: [],
	color: [],
	light: [],
	category: [],
}

const editSlice = createSlice({
	name: 'edit',
	initialState,
	reducers: {
		editImg(state, action) {
			state.mainImg = action.payload
		},
		editName(state, action) {
			state.name = action.payload
		},
		editPrice(state, action) {
			state.price = action.payload
		},
		editOldPrice(state, action) {
			state.oldPrice = action.payload
		},
		editNewGood(state, action) {
			state.newGood = action.payload
		},
		editSale(state, action) {
			state.sale = action.payload
		},
		editImgArchive(state, action) {
			state.images = [...state.images, action.payload]
		},
		editAddStructure(state, action) {
			state.structure = [...state.structure, action.payload.toString()]
		},
		editDeleteStructure(state, action) {
			state.structure = state.structure.filter(
				el => el !== action.payload.toString(),
			)
		},
		editAddFormat(state, action) {
			state.format = [...state.format, action.payload.toString()]
		},
		editDeleteFormat(state, action) {
			state.format = state.format.filter(el => el !== action.payload.toString())
		},
		editAddLight(state, action) {
			state.light = [...state.light, action.payload.toString()]
		},
		editDeleteLight(state, action) {
			state.light = state.light.filter(el => el !== action.payload.toString())
		},
		editAddColor(state, action) {
			state.color = [...state.color, action.payload.toString()]
		},
		editDeleteColor(state, action) {
			state.color = state.color.filter(el => el !== action.payload.toString())
		},
		editAddCategory(state, action) {
			state.category = [...state.category, action.payload.toString()]
		},
		editDeleteCategory(state, action) {
			state.category = state.category.filter(
				el => el !== action.payload.toString(),
			)
		},
		editDeleteImgArchiveItem(state, action) {
			state.images = state.images.filter((_, index) => index != action.payload)
		},
	},
	extraReducers: builder => {
		builder
			.addCase(FetchGetProduct.fulfilled, (state, action) => {
				state.id = action.payload.id
				if (action.payload.mainImg) {
					let format = ''
					const imgMain = action.payload.mainImg
					if (imgMain.startsWith('iVBOR')) format = 'image/png'
					if (imgMain.startsWith('UklGR')) format = 'image/webp'
					else format = 'image/jpeg'

					state.mainImg = `data:${format};base64,${imgMain}`
				} else {
					state.mainImg = ''
				}
				state.name = action.payload.name
				state.price = action.payload.price
				state.oldPrice = action.payload.oldPrice
				state.sale = action.payload.sale
				state.newGood = action.payload.newGood

				if (action.payload.images) {
					let format = ''
					const listImages = []
					const img = action.payload.images
					for (let i = 0; i < img.length; i++) {
						if (img[i].startsWith('iVBOR')) format = 'image/png'
						if (img[i].startsWith('UklGR')) format = 'image/webp'
						else format = 'image/jpeg'

						let str = `data:${format};base64,${img[i]}`
						listImages.push(str)
					}
					state.images = listImages
				} else {
					state.images = []
				}
				state.structure = action.payload.structure
				state.format = action.payload.format
				state.color = action.payload.color
				state.light = action.payload.light
				state.category = action.payload.category
			})
			.addCase(FetchPatchProduct.fulfilled, (state, action) => {
				state.id = action.payload.id
				state.name = action.payload.name
				state.price = action.payload.price
				state.oldPrice = action.payload.oldPrice
				state.sale = action.payload.sale
				state.newGood = action.payload.newGood
				state.structure = action.payload.structure
				state.format = action.payload.format
				state.color = action.payload.color
				state.light = action.payload.light
				state.category = action.payload.category
			})
	},
})

export const {
	editImg,
	editName,
	editPrice,
	editOldPrice,
	editNewGood,
	editSale,
	editImgArchive,
	editAddStructure,
	editDeleteStructure,
	editAddFormat,
	editDeleteFormat,
	editAddLight,
	editDeleteLight,
	editAddColor,
	editDeleteColor,
	editAddCategory,
	editDeleteCategory,
	editDeleteImgArchiveItem,
} = editSlice.actions
export default editSlice.reducer
