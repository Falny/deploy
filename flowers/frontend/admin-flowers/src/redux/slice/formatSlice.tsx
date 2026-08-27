import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

export type Format = {
	id: string
	format: string
}

interface FormatState {
	format: Format[]
	status: string
}

export const FetchFormatPost = createAsyncThunk(
	'admin/fetchFormatPost',
	async (format: string) => {
		try {
			await instance.post('/format', { format })
		} catch (err) {
			console.log(err)
		}
	},
)

export const FetchFormatGet = createAsyncThunk(
	'admin/fetchFormatGet',
	async () => {
		try {
			const { data } = await instance.get('/format')
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchFormatDelete = createAsyncThunk(
	'admin/fetchFormatDelete',
	async (id: string) => {
		try {
			await instance.delete(`/format/${id}`)
			return id
		} catch (err) {
			throw err
		}
	},
)

export const FetchFormatPatch = createAsyncThunk(
	'admin/fetchFormatPatch',
	async ({ id, format }: { id: string; format: string }) => {
		try {
			const { data } = await instance.patch(`/format/${id}`, { format })
			return data
		} catch (err) {
			throw err
		}
	},
)

const initialState: FormatState = {
	format: [],
	status: '',
}

const formatSlice = createSlice({
	name: 'format',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(FetchFormatGet.pending, state => {
				state.status = 'pending'
			})
			.addCase(FetchFormatGet.fulfilled, (state, action) => {
				state.format = action.payload
				state.status = 'success'
			})
			.addCase(FetchFormatGet.rejected, state => {
				state.status = 'error'
			})
			.addCase(FetchFormatDelete.pending, state => {
				state.status = 'pending'
			})
			.addCase(FetchFormatDelete.fulfilled, (state, action) => {
				state.format = state.format.filter(el => el.id !== action.payload)
				state.status = 'success'
			})
			.addCase(FetchFormatDelete.rejected, state => {
				state.status = 'error'
			})
			.addCase(FetchFormatPatch.pending, state => {
				state.status = 'pending'
			})
			.addCase(FetchFormatPatch.fulfilled, (state, action) => {
				state.format = state.format.map(el =>
					el.id === action.payload.id
						? { ...el, format: action.payload.format }
						: el,
				)
				state.status = 'success'
			})
			.addCase(FetchFormatPatch.rejected, state => {
				state.status = 'error'
			})
	},
})

export default formatSlice.reducer
