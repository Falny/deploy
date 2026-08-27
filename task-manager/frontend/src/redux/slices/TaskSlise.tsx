import {
	createSlice,
	type PayloadAction,
	createAsyncThunk,
} from '@reduxjs/toolkit'
import axios from 'axios'

import { instancePrivate } from '../../../axios'
import type { TaskType, TaskExportType } from '../../types/task.types'

const initialState: TaskType = {
	id_task: '',
	name: '',
	description: '',
	dateStart: '',
	dateEnd: '',
	status: '',
	peopleInProject: [],
	isCreator: false,
	task: [],
}

export const fetchGetTasks = createAsyncThunk(
	'task/getTask',
	async ({ id_project }: { id_project: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/get-tasks', {
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

export const fetchCreateTask = createAsyncThunk(
	'task/createTask',
	async ({ task }: { task: TaskExportType }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/task', { task: task })
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchUpdateTask = createAsyncThunk(
	'task/updateTask',
	async (task: TaskExportType, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/update-task', {
				task: task,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchTransferTaskToTrash = createAsyncThunk(
	'task/transferTask',
	async ({ id_task }: { id_task: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/transfer-task', {
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

const TaskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		setTasksNull(state) {
			state.name = ''
			state.description = ''
			state.dateStart = ''
			state.dateEnd = ''
			state.status = ''
			state.peopleInProject = []
			state.isCreator = false
		},
		setOneTaskForOpen(state, action) {
			state.id_task = action.payload.id_task
			state.name = action.payload.name
			state.description = action.payload.description
			state.dateStart = action.payload.dateStart
			state.dateEnd = action.payload.dateEnd
			state.status = action.payload.status
			state.peopleInProject = action.payload.peopleInProject
			state.isCreator = action.payload.isCreator
		},
		setName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		setDescription(state, action: PayloadAction<string>) {
			state.description = action.payload
		},
		setDateEnd(state, action: PayloadAction<string>) {
			state.dateEnd = action.payload
		},
		setStatusTask(state, action: PayloadAction<string>) {
			state.status = action.payload
		},
		setPeopleInProject(state, action) {
			const name = action.payload
			state.peopleInProject = state.peopleInProject.includes(name)
				? state.peopleInProject.filter(el => el !== name)
				: [...state.peopleInProject, name]
		},
		// очистить массив с участниками задачи
		setClearPeopleInProject(state) {
			state.peopleInProject = []
		},
		setTask(state, action) {
			state.task = [...state.task, action.payload]
		},
		// очистить сами задачи перед подгрузкой других
		setTaskClear(state) {
			state.task = []
		},
		setDeleteTask(state, action) {
			state.task = state.task.filter(obj => obj.id_task !== action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetTasks.fulfilled, (state, action) => {
			if (!action.payload.success) {
				state.task = []
			} else {
				state.task = action.payload.tasks
			}
		})
	},
})

export const {
	setTask,
	setTasksNull,
	setOneTaskForOpen,
	setName,
	setDescription,
	setDateEnd,
	setStatusTask,
	setPeopleInProject,
	setTaskClear,
	setClearPeopleInProject,
	setDeleteTask,
} = TaskSlice.actions
export default TaskSlice.reducer
