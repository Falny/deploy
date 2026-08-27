import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios'

type PasswordType = {
	password: string
}

export const fetchCheckPassword = createAsyncThunk(
	'password/checkPassword',
	async (password: string) => {
		try {
			const { data } = await instance.post('/password', { password })
			return data
		} catch (error) {}
	},
)

const initialState: PasswordType = {
	password: '',
}

const passwordSlice = createSlice({
	name: 'password',
	initialState,
	reducers: {
		setPassword(state, action) {
			state.password = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchCheckPassword.fulfilled, (_, action) => {
			if (action.payload) {
				window.localStorage.setItem('access', 'true')
				window.location.href = 'navbar'
			}
		})
	},
})

export const { setPassword } = passwordSlice.actions
export default passwordSlice.reducer
