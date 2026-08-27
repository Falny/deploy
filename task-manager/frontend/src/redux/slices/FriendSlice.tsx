import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { FriendType } from '../../types/task.types'
import { instancePrivate } from '../../../axios'
import axios from 'axios'

type FriendTypeInitial = {
	friend: FriendType[]
}

export const fetchGetFriend = createAsyncThunk(
	'friend/getFriend',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/get-friend')
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)
export const fetchDeleteFriend = createAsyncThunk(
	'friend/deleteFriend',
	async ({ login }: { login: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/delete-friend', {
				login: login,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const initialState: FriendTypeInitial = {
	friend: [],
}

const FriendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		setDeleteFriend(state, action) {
			state.friend = state.friend.filter(obj => obj.login !== action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetFriend.fulfilled, (state, action) => {
			if (action.payload.success) {
				const data = action.payload.friend.map((obj: any) => {
					let imgFormat
					if (obj.avatars) {
						const img = obj.avatars.split('|')[0]
						let img_format = ''
						if (img.startsWith('iVBOR')) img_format = 'image/png'
						if (img.startsWith('UklGR')) img_format = 'image/webp'
						if (img.startsWith('PHN2Zy')) img_format = 'image/svg+xml'
						else img_format = 'image/jpeg'

						imgFormat = `data:${img_format};base64,${img}`
					}
					return {
						avatars: imgFormat || '',
						login: obj.login,
						statusFriend: true,
					}
				})
				state.friend = data
			}
		})
	},
})

export const { setDeleteFriend } = FriendSlice.actions

export default FriendSlice.reducer
