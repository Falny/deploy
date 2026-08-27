import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { instancePrivate } from '../../../axios'
import axios from 'axios'

import type { StatusType } from '../../types/task.types'

const initialState: StatusType = {
	id: '',
	status: '',
	statusAdd: '',
	color: '#000',
}

export const fetchGetStatus = createAsyncThunk(
	'status/getStatus',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/get-status')
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)
export const fetchUpdateStatus = createAsyncThunk(
	'status/updateStatus',
	async (
		{ statusAdd, color }: { statusAdd: string; color: string },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await instancePrivate.post('/update-status', {
				status: statusAdd,
				color,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)
export const fetchDeleteStatus = createAsyncThunk(
	'status/deleteStatus',
	async ({ status }: { status: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/delete-status', {
				status,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const StatusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		setAddStatus(state, action) {
			state.statusAdd = action.payload
		},

		setStatus(state) {
			const newStatus = state.status.split(',')
			state.status = [...newStatus, state.statusAdd].join(',')
		},
		setDeleteStatus(state, action) {
			const newStatus = state.status
				.split(',')
				.filter(el => el !== action.payload)
			state.status = newStatus.join(',')
		},
		setColor(state, action) {
			state.color = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetStatus.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.status = action.payload.status
			}
		})
	},
})

export const { setAddStatus, setStatus, setDeleteStatus, setColor } =
	StatusSlice.actions
export default StatusSlice.reducer
