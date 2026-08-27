import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { instancePrivate } from '../../../axios'
import axios from 'axios'
import type { NotificationType } from '../../types/task.types'

type NotificationState = {
	notification: NotificationType[]
}

export const fetchNotification = createAsyncThunk(
	'notification/createNotification',
	async (
		{
			loginAnotherUser,
			text,
			time,
		}: { loginAnotherUser: string; text: string; time: string },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await instancePrivate.post('/create-notification', {
				loginAnotherUser: loginAnotherUser,
				text: text,
				time: time,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchGetNotification = createAsyncThunk(
	'notification/getNotification',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/get-notification')
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchDeleteNotification = createAsyncThunk(
	'notification/deleteNotification',
	async (id_note: string, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/delete-notification', {
				id_note: id_note,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchUpdateNotification = createAsyncThunk(
	'notification/updateNotification',
	async (
		{ note, purpose }: { note: NotificationType; purpose: string },
		{ rejectWithValue },
	) => {
		try {
			const { data } = await instancePrivate.put('/update-notification', {
				note: note,
				purpose: purpose,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const initialState: NotificationState = {
	notification: [],
}

const NotificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (state, action) => {
			if (action.payload.purpose === 'status') {
				state.notification = state.notification.map(obj => {
					if (obj.id_notification === action.payload.id && !obj.status) {
						return {
							...obj,
							status: true,
						}
					}

					return obj
				})
			}

			if (action.payload.purpose === 'friend') {
				state.notification = state.notification.map(obj => {
					if (obj.id_notification === action.payload.id && !obj.statusFriend) {
						return {
							...obj,
							statusFriend: true,
						}
					}

					return obj
				})
			}
		},
		setDeleteNote: (state, action) => {
			state.notification = state.notification.filter(
				obj => obj.id_notification != action.payload,
			)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetNotification.fulfilled, (state, action) => {
			if (!action.payload.success) {
				state.notification = []
			} else {
				state.notification = action.payload.notification
			}
		})
	},
})

export const { setNotification, setDeleteNote } = NotificationSlice.actions
export default NotificationSlice.reducer
