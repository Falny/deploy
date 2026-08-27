import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

export type Color = {
	id: string
	color: string
}

interface ColorState {
	color: Color[]
	status: string
}

export const FetchColorPost = createAsyncThunk(
	'admin/fetchColorPost',
	async (color: string) => {
		try {
			const { data } = await instance.post('/color', { color })
			return data
		} catch (err) {
			console.log(err)
		}
	},
)

export const FetchColorGet = createAsyncThunk(
	'admin/fetchColorGet',
	async () => {
		try {
			const { data } = await instance.get('/color')
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchColorDelete = createAsyncThunk(
	'admin/fetchColorDelete',
	async (id: string) => {
		try {
			await instance.delete(`/color/${id}`)
			return id
		} catch (err) {
			throw err
		}
	},
)

export const FetchColorPatch = createAsyncThunk(
	'admin/fetchColorPatch',
	async ({ id, color }: { id: string; color: string }) => {
		try {
			const { data } = await instance.patch(`/color/${id}`, { color })
			return data
		} catch (err) {
			throw err
		}
	},
)

const initialState: ColorState = {
	color: [],
	status: '',
}

const colorSlice = createSlice({
	name: 'color',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(FetchColorPost.fulfilled, (state, action) => {
				state.color = [...state.color, action.payload]
				state.status = 'success'
			})
			.addCase(FetchColorGet.fulfilled, (state, action) => {
				state.color = action.payload
				state.status = 'success'
			})
			.addCase(FetchColorDelete.fulfilled, (state, action) => {
				state.color = state.color.filter(el => el.id !== action.payload)
				state.status = 'success'
			})
			.addCase(FetchColorPatch.fulfilled, (state, action) => {
				state.color = state.color.map(el =>
					el.id === action.payload.id
						? { ...el, color: action.payload.color }
						: el,
				)
				state.status = 'success'
			})
	},
})

export default colorSlice.reducer
