import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

export type Light = {
	id: string
	light: string
}

interface LightState {
	light: Light[]
	status: string
}

export const FetchLightPost = createAsyncThunk(
	'admin/fetchLightPost',
	async (light: string) => {
		try {
			const { data } = await instance.post('/light', { light })
			return data
		} catch (err) {
			console.log(err)
		}
	},
)

export const FetchLightGet = createAsyncThunk(
	'admin/fetchLightGet',
	async () => {
		try {
			const { data } = await instance.get('/light')
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchLightDelete = createAsyncThunk(
	'admin/fetchLightDelete',
	async (id: string) => {
		try {
			await instance.delete(`/light/${id}`)
			return id
		} catch (err) {
			throw err
		}
	},
)

export const FetchLightPatch = createAsyncThunk(
	'admin/fetchLightPatch',
	async ({ id, light }: { id: string; light: string }) => {
		try {
			const { data } = await instance.patch(`/light/${id}`, { light })
			return data
		} catch (err) {
			throw err
		}
	},
)

const initialState: LightState = {
	light: [],
	status: '',
}

const lightSlice = createSlice({
	name: 'light',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(FetchLightPost.fulfilled, (state, action) => {
				state.light = [...state.light, action.payload]
			})
			.addCase(FetchLightGet.fulfilled, (state, action) => {
				state.light = action.payload
				state.status = 'success'
			})
			.addCase(FetchLightDelete.fulfilled, (state, action) => {
				state.light = state.light.filter(el => el.id !== action.payload)
				state.status = 'success'
			})
			.addCase(FetchLightPatch.fulfilled, (state, action) => {
				state.light = state.light.map(el =>
					el.id === action.payload.id
						? { ...el, light: action.payload.light }
						: el,
				)
				state.status = 'success'
			})
	},
})

export default lightSlice.reducer
