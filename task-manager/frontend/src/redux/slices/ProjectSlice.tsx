import {
	createSlice,
	type PayloadAction,
	createAsyncThunk,
} from '@reduxjs/toolkit'

import { instancePrivate } from '../../../axios'
import axios from 'axios'

import type { ProjectType, ProjectExportType } from '../../types/task.types'

const initialState: ProjectType = {
	projectOpenId: '',
	name: '',
	description: '',
	dateStart: '',
	dateEnd: '',
	adminOfProject: [],
	isCreator: false,
	project: [],
}

export const fetchCreateProject = createAsyncThunk(
	'project/createProject',
	async ({ project }: { project: ProjectExportType }) => {
		const { data } = await instancePrivate.post('/create-project', {
			project: project,
		})
		return data
	},
)

export const fetchGetProject = createAsyncThunk(
	'project/getProject',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.get('/get-project')
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchEditProject = createAsyncThunk(
	'project/editProject',
	async (project: ProjectExportType, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/edit-project', {
				project: project,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

export const fetchDeleteProject = createAsyncThunk(
	'project/deleteProject',
	async ({ id_project }: { id_project: string }, { rejectWithValue }) => {
		try {
			const { data } = await instancePrivate.post('/delete-project', {
				id_project,
			})
			return data
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data)
			}
		}
	},
)

const ProjectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setOneProjectForOpen(state, action) {
			state.projectOpenId = action.payload.projectOpenId
			state.name = action.payload.name
			state.description = action.payload.description
			state.adminOfProject = action.payload.adminOfProject
		},
		setProject(state) {
			state.name = ''
			state.description = ''
			state.adminOfProject = []
		},
		setName(state, action: PayloadAction<string>) {
			state.name = action.payload
		},
		setDescription(state, action: PayloadAction<string>) {
			state.description = action.payload
		},
		setDateStart(state, action: PayloadAction<string>) {
			state.dateStart = action.payload
		},
		setDateEnd(state, action: PayloadAction<string>) {
			state.dateEnd = action.payload
		},
		setAdminOfProject(state, action) {
			state.adminOfProject = state.adminOfProject.includes(action.payload)
				? state.adminOfProject.filter(el => el !== action.payload)
				: [...state.adminOfProject, action.payload]
		},
		setOpenProjectId(state, action) {
			state.projectOpenId = action.payload
		},
		setAddProject(state, action) {
			state.project = [...state.project, action.payload]
		},
		setAdminProjectSetAll(state, action) {
			state.adminOfProject = action.payload
		},
		setRemoveProject(state, action) {
			state.project = state.project.filter(
				obj => obj.id_project !== action.payload,
			)
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchGetProject.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.project = action.payload.projects
			}
		})
	},
})

export const {
	setRemoveProject,
	setProject,
	setName,
	setDescription,
	setDateStart,
	setDateEnd,
	setAdminOfProject,
	setOpenProjectId,
	setAddProject,
	setAdminProjectSetAll,
	setOneProjectForOpen,
} = ProjectSlice.actions
export default ProjectSlice.reducer
