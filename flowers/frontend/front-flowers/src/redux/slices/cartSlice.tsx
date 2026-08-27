import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../axios'

type Cart = {
	id: string
	idGood: string
	mainImg: string
	name: string
	price: number
	count: number
}

interface CartState {
	items: Cart[]
	status: string
}

const initialState: CartState = {
	items: [],
	status: 'loading',
}

export const fetchPostCart = createAsyncThunk(
	'cart/fetchAddCart',
	async (id: string) => {
		try {
			const { data } = await instance.post('/cart', { id })
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
	try {
		const { data } = await instance.get('/cart')
		return data
	} catch (err) {
		console.log(err)
		throw err
	}
})

export const FetchDelete = createAsyncThunk(
	'cartDelete/fetchDelete',
	async (id: string) => {
		try {
			await instance.delete('/cart/' + id)
			return id
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const FetchUpdate = createAsyncThunk(
	'cartUpdate/fetchUpdate',
	async ({ id, count }: { id: string; count: number }) => {
		try {
			const { data } = await instance.patch('/cart/' + id, {
				count,
			})
			return data
		} catch (err) {
			console.log(err)
			throw err
		}
	},
)

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCount(state, action) {
			state.items = state.items.map(obj => {
				if (obj.id === action.payload.id) {
					obj.count = action.payload.count
				}
				return obj
			})
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPostCart.fulfilled, (state, action) => {
				if (action.payload) {
					const data = action.payload
					const imgMain = data.mainImg
					let formatImgMain = ''

					if (imgMain.startsWith('iVBOR')) formatImgMain = 'image/png'
					if (imgMain.startsWith('UklGR')) formatImgMain = 'image/webp'
					else formatImgMain = 'image/jpeg'

					data.mainImg = `data:${formatImgMain};base64,${imgMain}`
				}
				state.items = [...state.items, action.payload]
			})
			.addCase(FetchDelete.fulfilled, (state, action) => {
				state.status = 'success'
				state.items = state.items.filter(item => item.id !== action.payload)
			})
			.addCase(FetchUpdate.fulfilled, (state, action) => {
				state.status = 'success'
				state.items = state.items.map(el => {
					return el.id === action.payload._id
						? { ...el, count: action.payload.count }
						: el
				})
			})
			.addCase(FetchUpdate.rejected, state => {
				state.items = []
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				console.log(action.payload)
				const data = action.payload.map((obj: any) => {
					const imgMain = obj.mainImg
					let formatImgMain = ''

					if (imgMain.startsWith('iVBOR')) formatImgMain = 'image/png'
					if (imgMain.startsWith('UklGR')) formatImgMain = 'image/webp'
					else formatImgMain = 'image/jpeg'

					obj.mainImg = `data:${formatImgMain};base64,${imgMain}`
					return obj
				})
				state.items = data
			})
	},
})

export const { setCount } = cartSlice.actions
export default cartSlice.reducer
