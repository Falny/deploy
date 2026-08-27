import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'
import type { GoodType } from '../../types'

export type AdminType = {
	id: string
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

export const FetchPostAdmin = createAsyncThunk(
	'admin/fetchAdminPost',
	async (product: GoodType) => {
		try {
			const { data } = await instance.post('/cards', product)
			alert('данные успешно отправлены')
			return data
		} catch (err) {
			console.log(err)
			alert('Такое поле уже есть')
			throw err
		}
	},
)

export const FetchDeleteAdmin = createAsyncThunk(
	'admin/fetchAdminDelete',
	async (id: string) => {
		try {
			await instance.delete(`/cards/${id}`)
			return id
		} catch (err) {
			console.log(err)
			alert('Такое поле уже есть')
			throw err
		}
	},
)

export const FetchGetProduct = createAsyncThunk(
	'admin/fetchGetProduct',
	async () => {
		try {
			const { data } = await instance.get('/cards')
			return data
		} catch (err) {
			throw err
		}
	},
)

interface AdminInterface {
	item: AdminType[]
	status: string
}

const initialState: AdminInterface = {
	item: [],
	status: '',
}

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(FetchGetProduct.fulfilled, (state, action) => {
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
				state.item = data
			})
			.addCase(FetchDeleteAdmin.fulfilled, (state, action) => {
				state.item = state.item.filter(el => el.id !== action.payload)
			})
	},
})

export default adminSlice.reducer
