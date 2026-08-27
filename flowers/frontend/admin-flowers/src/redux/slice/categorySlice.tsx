import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

export type Category = {
	id: string
	category: string
}

interface CategoryState {
	category: Category[]
	status: string
}

export const FetchCategoryPost = createAsyncThunk(
	'admin/fetchCategoryPost',
	async (category: string) => {
		try {
			const { data } = await instance.post('/category', { category })
			return data
		} catch (err) {
			console.log(err)
		}
	},
)

export const FetchCategoryGet = createAsyncThunk(
	'admin/fetchCategoryGet',
	async () => {
		try {
			const { data } = await instance.get('/category')
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchCategoryDelete = createAsyncThunk(
	'admin/fetchCategoryDelete',
	async (id: string) => {
		try {
			await instance.delete(`/category/${id}`)
			return id
		} catch (err) {
			console.log(err)
			alert('Не удалось удалить категорию')
		}
	},
)

export const FetchCategoryPatch = createAsyncThunk(
	'admin/fetchCategoryPatch',
	async ({ id, category }: { id: string; category: string }) => {
		try {
			const { data } = await instance.patch(`/category/${id}`, { category })
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

const initialState: CategoryState = {
	category: [],
	status: '',
}

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(FetchCategoryPost.fulfilled, (state, action) => {
				state.category = [...state.category, action.payload]
			})
			.addCase(FetchCategoryGet.fulfilled, (state, action) => {
				state.category = action.payload
				state.status = 'success'
			})
			.addCase(FetchCategoryDelete.fulfilled, (state, action) => {
				state.category = state.category.filter(el => el.id !== action.payload)
				state.status = 'success'
			})
			.addCase(FetchCategoryPatch.fulfilled, (state, action) => {
				state.category = state.category.map(el =>
					el.id === action.payload.id
						? { ...el, category: action.payload.category }
						: el,
				)
				state.status = 'success'
			})
	},
})

export default categorySlice.reducer
