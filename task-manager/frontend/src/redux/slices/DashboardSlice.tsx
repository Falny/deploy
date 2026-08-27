import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { DashBoard } from '../../types/task.types'
import axios from 'axios'
import { instancePrivate } from '../../../axios'

export const fetchGetDashBoard = createAsyncThunk(
	'dashboard/getDashboard',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/dashboard')
			return data
		} catch (error) {
			if (axios.isAxiosError(error))
				return rejectWithValue(error.response?.data)
		}
	},
)

const initialState: DashBoard = {
	statistics: [],
	countCreateTask: 0,
	countDeleteTask: 0,
	countExpiredTask: 0,
	countAddFriend: 0,
	countCreateProject: 0,
	countDeleteProject: 0,
	countTaskWereYouAdd: 0,
	countProjectWereYouAdd: 0,
}

const DashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchGetDashBoard.fulfilled, (state, action) => {
			const result = action.payload
			if (result.success) {
				state.statistics = result.statistics
				state.countCreateTask = result.countCreateTask
				state.countDeleteTask = result.countDeleteTask
				state.countExpiredTask = result.countExpiredTask
				state.countAddFriend = result.countAddFriend
				state.countCreateProject = result.countCreateProject
				state.countDeleteProject = result.countDeleteProject
				state.countTaskWereYouAdd = result.countTaskWereYouAdd
				state.countProjectWereYouAdd = result.countProjectWereYouAdd
			}
		})
	},
})

export default DashboardSlice.reducer
