import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

type Category = {
	id: string
	category: string
}
type Light = {
	id: string
	light: string
}
type Color = {
	id: string
	color: string
}
type Format = {
	id: string
	format: string
}
type Structure = {
	id: string
	structure: string
}

interface SortsState {
	category: Category[]
	light: Light[]
	color: Color[]
	format: Format[]
	structure: Structure[]
	status: String
	error: String | undefined
}

export const FetchSorts = createAsyncThunk<
	{
		category: Category[]
		light: Light[]
		color: Color[]
		format: Format[]
		structure: Structure[]
	},
	void
>('sorts/fetchSorts', async () => {
	try {
		const { data } = await instance.get(`/sort`)
		return data
	} catch (err) {
		console.log(err)
		throw err
	}
})

const initialState: SortsState = {
	category: [],
	light: [],
	color: [],
	format: [],
	structure: [],
	status: 'loading',
	error: '',
}

const SortsSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(FetchSorts.fulfilled, (state, action) => {
			state.category = action.payload.category
			state.light = action.payload.light
			state.color = action.payload.color
			state.format = action.payload.format
			state.structure = action.payload.structure
		})
	},
})

export default SortsSlice.reducer
