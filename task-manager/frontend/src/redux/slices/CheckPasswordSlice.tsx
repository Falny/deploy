import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { CheckPassword } from '../../types/task.types'
import { instancePrivate } from '../../../axios'
import axios from 'axios'

export const handleCheckPassword = createAsyncThunk(
	'password/check-password',
	async ({ password }: { password: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/check-password', {
				password: password,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)
export const fetchCreatePassword = createAsyncThunk(
	'password/create-password',
	async ({ password }: { password: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/create-password', {
				password: password,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchUpdatePassword = createAsyncThunk(
	'password/update-password',
	async ({ password }: { password: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/update-password', {
				password: password,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const initialState: CheckPassword = {
	token: '',
	password: '',
}

const checkPasswordSlice = createSlice({
	name: 'check_password',
	initialState,
	reducers: {},
})

export default checkPasswordSlice.reducer
