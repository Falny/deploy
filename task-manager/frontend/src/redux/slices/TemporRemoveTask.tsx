import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { instancePrivate } from '../../../axios'
import type { TemporaryRemovalTask } from '../../types/task.types'

export const fetchGetTransferTaskToTrash = createAsyncThunk(
	'removeTask/getTransferTask',
	async ({ id_project }: { id_project: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/get-transfer-task', {
				id_project: id_project,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchDeleteTransferTaskToTrash = createAsyncThunk(
	'removeTask/deleteTransferTask',
	async ({ id_task }: { id_task: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/delete-transfer-task', {
				id_task: id_task,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchSaveTransferTaskToTrash = createAsyncThunk(
	'removeTask/saveTransferTask',
	async ({ id_task }: { id_task: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/update-transfer-task', {
				id_task: id_task,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

type TRtype = {
	task: TemporaryRemovalTask[]
}

const initialState: TRtype = {
	task: [],
}

const RemoveTaskSlice = createSlice({
	name: 'removeTask',
	initialState,
	reducers: {
		setRemoveTask(state, action) {
			state.task = [...state.task, action.payload]
		},
		setCleanTaskTrash(state) {
			state.task = []
		},
		setFilterTrashTask(state, action) {
			state.task = state.task.filter(obj => obj.id_task !== action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetTransferTaskToTrash.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.task = action.payload.task
			}
		})
	},
})

export const { setRemoveTask, setCleanTaskTrash, setFilterTrashTask } =
	RemoveTaskSlice.actions
export default RemoveTaskSlice.reducer
