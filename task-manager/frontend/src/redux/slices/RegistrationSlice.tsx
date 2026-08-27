import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Registration } from '../../types/task.types'
import { instance } from '../../../axios'
import axios from 'axios'

const initialState: Registration = {
	login: '',
	password: '',
	againPassword: '',
}

export const handleCheckRegistrationLogin = createAsyncThunk(
	'registration/checkLogin',
	async (login: string, { rejectWithValue }) => {
		try {
			const { data } = await instance.post('/check-login', login)
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error)
				return rejectWithValue(error.response?.data)
			}
			return rejectWithValue('Произошла непредвиденная ошибка')
		}
	},
)

export const handleRegistration = createAsyncThunk(
	'registration/createRegistration',

	async ({ regist }: { regist: Registration }, { rejectWithValue }) => {
		try {
			const { data } = await instance.post('/registration', regist)
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
			return rejectWithValue('Произошла непредвиденная ошибка')
		}
	},
)

const RegistrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.login = action.payload
		},
		setPassword: (state, action) => {
			state.password = action.payload
		},
		setPasswordAgain: (state, action) => {
			state.againPassword = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(handleRegistration.fulfilled, state => {
			state.login = ''
			state.password = ''
			state.againPassword = ''
		})
	},
})

export const { setLogin, setPassword, setPasswordAgain } =
	RegistrationSlice.actions
export default RegistrationSlice.reducer
