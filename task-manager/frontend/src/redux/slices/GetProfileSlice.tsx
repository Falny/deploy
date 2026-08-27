import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from '@reduxjs/toolkit'
import type { Profile } from '../../types/task.types'
import { instancePrivate } from '../../../axios'

import axios from 'axios'

const initialState: Profile = {
	avatars: [],
	login: '',
	name: '',
	password: '',
	token: '',
	statuses: '',
	friends: [],
	isHowCreated: false,
}

export const fetchLoginProfile = createAsyncThunk(
	'profile/getLoginProfile',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/get-login-profile')
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
			return rejectWithValue('Произошла ошибка')
		}
	},
)

export const handleGetProfile = createAsyncThunk(
	'profile/getProfile',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/profile')
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
			return rejectWithValue('Произошла ошибка')
		}
	},
)

export const handleUpdateProfile = createAsyncThunk(
	'profile/updateProfile',
	async ({ profile }: { profile: Profile }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.put('/update-profile', profile)
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
			return rejectWithValue('Произошла ошибка')
		}
	},
)

const GetProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setAvatar: (state, action: PayloadAction<string>) => {
			state.avatars = [...state.avatars, action.payload]
		},
		setLogin: (state, action) => {
			state.login = action.payload
		},
		setName: (state, action) => {
			state.name = action.payload
		},
		setPassword: (state, action) => {
			state.password = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(handleGetProfile.fulfilled, (state, action) => {
			if (action.payload.avatars) {
				const img = action.payload.avatars.split('|')[0]
				let img_format = ''
				if (img.startsWith('iVBOR')) img_format = 'image/png'
				if (img.startsWith('UklGR')) img_format = 'image/webp'
				if (img.startsWith('PHN2Zy')) img_format = 'image/svg+xml'
				else img_format = 'image/jpeg'

				let finalImg = `data:${img_format};base64,${img}`

				state.avatars.push(finalImg) || []
			}

			state.login = action.payload.login
			state.name = action.payload.name
			state.password = '**********'
			state.statuses = action.payload.statuses
			state.friends = action.payload.friends
			state.isHowCreated = action.payload.isHowCreated
		})
		builder.addCase(handleGetProfile.pending, (state, _) => {
			state.avatars = []
			state.login = ''
			state.name = ''
			state.password = ''
			state.statuses = ''
		})
		builder.addCase(fetchLoginProfile.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.login = action.payload.login
			}
		})
	},
})

export const { setAvatar, setLogin, setPassword, setName } =
	GetProfileSlice.actions
export default GetProfileSlice.reducer
