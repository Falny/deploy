import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from '../../../axios'
import axios from 'axios'

type LoginTypeInitial = {
	login: string
}

export const fetchGetAuthorizedYandex = createAsyncThunk(
	'login/getLoginYandex',
	async (code: string, { rejectWithValue }) => {
		try {
			const { data } = await instance.post('/get-login-yandex', code)
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchLogin = createAsyncThunk(
	'login/getLogin',
	async (
		{ login, password }: { login: string; password: string },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await instance.post('/login', { login, password })
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const initialState: LoginTypeInitial = {
	login: '',
}

const LoginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchLogin.fulfilled, (_, action) => {
			if (action.payload.success) {
				window.localStorage.setItem('token', action.payload.token)
				window.location.href = 'tatipati'
			}
		})
		builder.addCase(fetchGetAuthorizedYandex.fulfilled, (_, action) => {
			if (action.payload.success) {
				window.localStorage.setItem('token', action.payload.token)
			}
		})
	},
})

export default LoginSlice.reducer
