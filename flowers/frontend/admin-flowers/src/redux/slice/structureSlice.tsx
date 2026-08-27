import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

export type Structure = {
	id: string
	structure: string
}

interface StructureState {
	structure: Structure[]
	status: string
}

export const FetchStructurePost = createAsyncThunk(
	'admin/fetchStructurePost',
	async (structure: string) => {
		try {
			const { data } = await instance.post('/structure', { structure })
			return data
		} catch (err) {
			console.log(err)
		}
	},
)

export const FetchStructureGet = createAsyncThunk(
	'admin/fetchStructureGet',
	async () => {
		try {
			const { data } = await instance.get('/structure')
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchStructureDelete = createAsyncThunk(
	'admin/fetchStructureDelete',
	async (id: string) => {
		try {
			await instance.delete(`/structure/${id}`)
			return id
		} catch (err) {
			throw err
		}
	},
)

export const FetchStructurePatch = createAsyncThunk(
	'admin/fetchStructurePatch',
	async ({ id, structure }: { id: string; structure: string }) => {
		try {
			const { data } = await instance.patch(`/structure/${id}`, { structure })
			return data
		} catch (err) {
			throw err
		}
	},
)

const initialState: StructureState = {
	structure: [],
	status: '',
}

const structuraSlice = createSlice({
	name: 'structure',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(FetchStructureGet.fulfilled, (state, action) => {
				state.structure = action.payload
				state.status = 'success'
			})
			.addCase(FetchStructureDelete.fulfilled, (state, action) => {
				state.structure = state.structure.filter(el => el.id !== action.payload)
				state.status = 'success'
			})
			.addCase(FetchStructurePatch.fulfilled, (state, action) => {
				state.structure = state.structure.map(el =>
					el.id === action.payload.id
						? { ...el, structure: action.payload.structure }
						: el,
				)
				state.status = 'success'
			})
			.addCase(FetchStructurePost.fulfilled, (state, action) => {
				state.structure = [...state.structure, action.payload]
			})
	},
})

export default structuraSlice.reducer
