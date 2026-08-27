import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { SearchFriendType } from '../../types/task.types'
import axios from 'axios'
import { instancePrivate } from '../../../axios'

export const fetchSearchFriend = createAsyncThunk(
	'search_friend/fetchSearchFriend',
	async ({ name }: { name: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/search-friend', {
				name: name,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const initialState: SearchFriendType = {
	name: '',
	users: [],
}

const SearchSlice = createSlice({
	name: 'search_friend',
	initialState,
	reducers: {
		setSearchName: (state, action) => {
			state.name = action.payload
		},
		setClearFriend: state => {
			state.users = []
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchSearchFriend.fulfilled, (state, action) => {
			if (action.payload.success) {
				const processedData = action.payload.search.map((obj: any) => {
					let finalImg
					if (obj.avatars) {
						const img = obj.avatars.split('|')[0]
						let img_format = ''
						if (img.startsWith('iVBOR')) img_format = 'image/png'
						if (img.startsWith('UklGR')) img_format = 'image/webp'
						if (img.startsWith('PHN2Zy')) img_format = 'image/svg+xml'
						else img_format = 'image/jpeg'

						finalImg = `data:${img_format};base64,${img}`
					}

					return {
						avatars: finalImg || '',
						login: obj.login,
					}
				})

				state.users = processedData
			} else {
				state.users = []
			}
		})
	},
})

export const { setSearchName, setClearFriend } = SearchSlice.actions
export default SearchSlice.reducer
