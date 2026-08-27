import { createSlice } from '@reduxjs/toolkit'
import type { ItemState } from '../../types'

const initialState: ItemState = {
	values: {
		imgMain: '',
		title: '',
		price: '',
		oldPrice: '',
		sale: false,
		new: false,
		images: [],
		category: [],
		light: [],
		color: [],
		format: [],
		structure: [],
	},
	errors: {
		price: '',
		oldPrice: '',
	},
}

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setImg(state, action) {
			state.values.imgMain = action.payload
		},
		setTitle(state, action) {
			state.values.title = action.payload
		},
		setPrice(state, action) {
			if (/^\d*$/.test(action.payload)) {
				state.values.price = action.payload
				state.errors.price = ''
			} else {
				state.errors.price = 'Поле должно содержать только цифры'
			}
		},
		setOldPrice(state, action) {
			if (/^\d*$/.test(action.payload)) {
				state.values.oldPrice = action.payload
				state.errors.oldPrice = ''
			} else {
				state.errors.oldPrice = 'Поле должно содержать только цифры'
			}
		},
		setNew(state, action) {
			state.values.new = action.payload
		},
		setSale(state, action) {
			state.values.sale = action.payload
		},
		setImgArchive(state, action) {
			state.values.images = [...state.values.images, action.payload]
		},
		setCategory(state, action) {
			state.values.category = [
				...state.values.category,
				action.payload.toString(),
			]
		},
		deleteCategory(state, action) {
			state.values.category = state.values.category.filter(
				el => el !== action.payload.toString(),
			)
		},
		setColor(state, action) {
			state.values.color = [...state.values.color, action.payload.toString()]
		},
		deleteColor(state, action) {
			state.values.color = state.values.color.filter(
				el => el !== action.payload.toString(),
			)
		},
		setStructure(state, action) {
			state.values.structure = [
				...state.values.structure,
				action.payload.toString(),
			]
		},
		deleteStructure(state, action) {
			state.values.structure = state.values.structure.filter(
				el => el !== action.payload.toString(),
			)
		},
		setFormat(state, action) {
			state.values.format = [...state.values.format, action.payload.toString()]
		},
		deleteFormat(state, action) {
			state.values.format = state.values.format.filter(
				el => el !== action.payload.toString(),
			)
		},
		setLight(state, action) {
			state.values.light = [...state.values.light, action.payload.toString()]
		},
		deleteLight(state, action) {
			state.values.light = state.values.light.filter(
				el => el !== action.payload.toString(),
			)
		},
		updateData: () => initialState,
	},
})

export default formSlice.reducer

export const {
	setTitle,
	setPrice,
	setOldPrice,
	setNew,
	setSale,
	setCategory,
	deleteCategory,
	setColor,
	deleteColor,
	setStructure,
	deleteStructure,
	setFormat,
	deleteFormat,
	setLight,
	deleteLight,
	updateData,
	setImg,
	setImgArchive,
} = formSlice.actions
