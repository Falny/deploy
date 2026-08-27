import { createSlice } from '@reduxjs/toolkit'

interface FilterState {
	category: string[] | string
	light: string[] | string
	color: string[] | string
	format: string[] | string
	structure: string[] | string
}

const initialState: FilterState = {
	category: [],
	light: [],
	color: [],
	format: [],
	structure: [],
}

const FilterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory(state, action) {
			state.category = action.payload
		},
		setLight(state, action) {
			state.light = action.payload
		},
		setColor(state, action) {
			state.color = action.payload
		},
		setFormat(state, action) {
			state.format = action.payload
		},
		setStructure(state, action) {
			state.structure = action.payload
		},
	},
})

export default FilterSlice.reducer
export const { setCategory, setLight, setColor, setStructure, setFormat } =
	FilterSlice.actions
