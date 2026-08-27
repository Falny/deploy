import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { v4 as uuidv4 } from 'uuid'

import { fetchGetAuthorizedYandex, fetchLogin } from '../slices/LoginSlice'
import { fetchGetDashBoard } from '../slices/DashboardSlice'

import {
	fetchCreateProject,
	fetchGetProject,
	fetchDeleteProject,
	fetchEditProject,
} from './ProjectSlice'
import {
	handleGetProfile,
	handleUpdateProfile,
	fetchLoginProfile,
} from './GetProfileSlice'
import {
	handleCheckRegistrationLogin,
	handleRegistration,
} from './RegistrationSlice'
import {
	handleCheckPassword,
	fetchCreatePassword,
	fetchUpdatePassword,
} from '../slices/CheckPasswordSlice'
import { fetchSearchFriend } from './SearchFriendSlice'
import {
	fetchNotification,
	fetchGetNotification,
	fetchUpdateNotification,
	fetchDeleteNotification,
} from './NotificationSlice'

import { fetchGetFriend, fetchDeleteFriend } from './FriendSlice'

import {
	fetchGetStatus,
	fetchUpdateStatus,
	fetchDeleteStatus,
} from './StatusSlice'

import {
	fetchUpdateTask,
	fetchCreateTask,
	fetchGetTasks,
	fetchTransferTaskToTrash,
} from './TaskSlise'

import {
	fetchGetTransferTaskToTrash,
	fetchDeleteTransferTaskToTrash,
	fetchSaveTransferTaskToTrash,
} from './TemporRemoveTask'

export type WarningNoteType = {
	id?: string
	toggleWarningMessage:
		| { text: string; status: 'ERROR' | 'SUCCESS' | '' }
		| undefined
}

export interface ToggleState {
	toggleCreateTask: boolean // переключение компонента создания задачи
	toggleCreateProject: boolean // переключение компонента создания проекта
	toggleEditProfile: boolean // переключение редактирования профиля
	warnings: WarningNoteType[]
	toggleShowNoteCheckPass: boolean
	toggleAgreeToChangePassword: boolean
	toggleShowChangePasswordInEdit: boolean // показывает окно с полями для проверки старого пароля
	toggleCheckPasswordToChangeIt: boolean
	toggleEditTask: boolean // для отображения окна с редактированием задачи
	toggleShowCreateStatus: boolean // отображение окна для создания статуса
	toggleShowOpenProject: boolean // отображение компонента OpenProject
	toggleShowOpenNoteDelete: boolean // отображение уведомление для переноса задачи/проекта в удаленное
	toggleTransferToTrashTask: boolean
	toggleTransferToTrashProject: boolean
	whatChangeTaskOrProject: 'T' | 'P' | 'F' | '' // 'task' | 'project' | 'friend'
	toggleShowOpenTemporRemove: boolean // открывает удаленные задачи/проекты
	isProjectGet: boolean // добавляет стиль прокрутки при быстром создании проекта и его открытии idшник не успевает придти с бека поэтому надо затормозить процесс чутка
	toggleCheckLogin: boolean // нужно для отправки данных при регистрации, если он false то не отправлять потому что такой логин уже существует
	deleteFriend: boolean // удалить друга или нет
	toggleUpdatePasswordWindow: boolean // показывает окно для нового пароля после того как подошла проверка старого
	toggleEditProject: boolean // показывает окно с редактирование проекта
	// каким образом произошел вход? либо обычно, либо через браузеры || true - через браузеры; false - через обычный вход
	isAuth: boolean
}

const initialState: ToggleState = {
	toggleCreateTask: false,
	toggleCreateProject: false,
	toggleEditProfile: false,
	warnings: [],
	toggleShowNoteCheckPass: false,
	toggleAgreeToChangePassword: false,
	toggleShowChangePasswordInEdit: false,
	toggleCheckPasswordToChangeIt: false,
	toggleEditTask: false,
	toggleShowCreateStatus: false,
	toggleShowOpenProject: false,
	toggleShowOpenNoteDelete: false, // отображение уведомление для переноса задачи/проекта в удаленное
	toggleTransferToTrashTask: false,
	toggleTransferToTrashProject: false,
	whatChangeTaskOrProject: '',
	toggleShowOpenTemporRemove: false,
	isProjectGet: false,
	toggleCheckLogin: true,
	deleteFriend: false,
	toggleUpdatePasswordWindow: false,
	toggleEditProject: false,
	isAuth: false,
}

export const ToggleSlice = createSlice({
	name: 'toggle',
	initialState,
	reducers: {
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},
		setToggleEditProject: (state, action) => {
			state.toggleEditProject = action.payload
		},
		setToggleUpdatePasswordWindow: (state, action) => {
			state.toggleUpdatePasswordWindow = action.payload
		},
		setDeleteFriendToggle: (state, action) => {
			state.deleteFriend = action.payload
		},
		setToggleCheckLogin: (state, action: PayloadAction<boolean>) => {
			state.toggleCheckLogin = action.payload
		},
		setToggleCreateTask: (state, action: PayloadAction<boolean>) => {
			state.toggleCreateTask = action.payload
		},
		setToggleCreateProject: (state, action: PayloadAction<boolean>) => {
			state.toggleCreateProject = action.payload
		},
		setToggleEditProfile: (state, action: PayloadAction<boolean>) => {
			state.toggleEditProfile = action.payload
		},
		setToggleWarningMessage: (
			state,
			action: PayloadAction<WarningNoteType>,
		) => {
			const uuid = uuidv4()

			state.warnings = [
				...state.warnings,
				{
					id: uuid,
					toggleWarningMessage: action.payload.toggleWarningMessage,
				},
			]
		},
		setDeleteWarning(state, action) {
			state.warnings = state.warnings.filter(obj => obj.id !== action.payload)
		},
		setToggleShowNoteCheckPass: (state, action) => {
			state.toggleShowNoteCheckPass = action.payload
		},
		setToggleAgreeToChangePassword: (state, action) => {
			state.toggleAgreeToChangePassword = action.payload
		},
		setToggleShowChangePasswordInEdit: (state, action) => {
			state.toggleShowChangePasswordInEdit = action.payload
		},
		setToggleCheckPasswordToChangeIt: (state, action) => {
			state.toggleCheckPasswordToChangeIt = action.payload
		},
		setToggleEditTask: (state, action) => {
			state.toggleEditTask = action.payload
		},
		setToggleShowCreateStatus: (state, action) => {
			state.toggleShowCreateStatus = action.payload
		},
		setToggleShowOpenProject: (state, action) => {
			state.toggleShowOpenProject = action.payload
		},
		setToggleShowOpenNoteDelete: (state, action) => {
			state.toggleShowOpenNoteDelete = action.payload
		},
		setToggleTransferToTrashTask: (state, action) => {
			state.toggleTransferToTrashTask = action.payload
		},
		setToggleTransferToTrashProject: (state, action) => {
			state.toggleTransferToTrashProject = action.payload
		},
		setWhatChangeTaskOrProject: (state, action) => {
			state.whatChangeTaskOrProject = action.payload
		},
		setToggleShowOpenTemporRemove: (state, action) => {
			state.toggleShowOpenTemporRemove = action.payload
		},
		setIsProjectGet: (state, action) => {
			state.isProjectGet = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCreateProject.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchCreateProject.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})

			// // ошибка профиля
			.addCase(handleGetProfile.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(handleUpdateProfile.fulfilled, (state, action) => {
				const uuid = uuidv4()
				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: action.payload.text,
							status: 'SUCCESS',
						},
					},
				]
			})
			.addCase(handleUpdateProfile.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchLoginProfile.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchLoginProfile.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
					window.location.href = '/'
				}
			})
			.addCase(handleCheckRegistrationLogin.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
					state.toggleCheckLogin = false
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
					state.toggleCheckLogin = true
				}
			})
			.addCase(handleCheckRegistrationLogin.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(handleRegistration.fulfilled, (state, action) => {
				const uuid = uuidv4()

				if (action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(handleRegistration.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(handleCheckPassword.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
					state.toggleCheckPasswordToChangeIt = true
					state.toggleShowChangePasswordInEdit = false
					state.toggleUpdatePasswordWindow = true
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(handleCheckPassword.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchSearchFriend.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(fetchSearchFriend.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchNotification.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchNotification.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchGetNotification.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})

			.addCase(fetchGetNotification.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})

			.addCase(fetchUpdateNotification.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchUpdateNotification.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchGetFriend.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetProject.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					// мне приходят все проекты а значит я могу теперь их открывать поэтому флаг на подгрузку меняю на false
					state.isProjectGet = false // убираю стиль прокрутки и теперь можно зайти в проект
				}
			})
			.addCase(fetchGetProject.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetStatus.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchUpdateStatus.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchUpdateStatus.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchDeleteStatus.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchDeleteStatus.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetTasks.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchCreateTask.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchUpdateTask.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetTasks.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(fetchCreateTask.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchUpdateTask.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchTransferTaskToTrash.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchTransferTaskToTrash.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetTransferTaskToTrash.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetTransferTaskToTrash.fulfilled, (state, action) => {
				if (action.payload.success) {
					const uuid = uuidv4()
					if (!action.payload.success) {
						state.warnings = [
							...state.warnings,
							{
								id: uuid,
								toggleWarningMessage: {
									text: action.payload.text,
									status: 'ERROR',
								},
							},
						]
					}
				}
			})
			.addCase(fetchDeleteTransferTaskToTrash.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchDeleteTransferTaskToTrash.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchSaveTransferTaskToTrash.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchSaveTransferTaskToTrash.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchDeleteProject.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchDeleteProject.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchDeleteNotification.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchDeleteNotification.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchDeleteFriend.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
			})
			.addCase(fetchDeleteFriend.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetAuthorizedYandex.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(fetchGetAuthorizedYandex.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchCreatePassword.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}
				state.toggleUpdatePasswordWindow = false
			})
			.addCase(fetchCreatePassword.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchUpdatePassword.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}

				state.toggleUpdatePasswordWindow = false
			})
			.addCase(fetchUpdatePassword.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchEditProject.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				} else {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'SUCCESS',
							},
						},
					]
				}

				state.toggleUpdatePasswordWindow = false
			})
			.addCase(fetchEditProject.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchGetDashBoard.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(fetchGetDashBoard.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				const uuid = uuidv4()
				if (!action.payload.success) {
					state.warnings = [
						...state.warnings,
						{
							id: uuid,
							toggleWarningMessage: {
								text: action.payload.text,
								status: 'ERROR',
							},
						},
					]
				}
			})
			.addCase(fetchLogin.rejected, state => {
				const uuid = uuidv4()

				state.warnings = [
					...state.warnings,
					{
						id: uuid,
						toggleWarningMessage: {
							text: 'Произошла ошибка непредвиденная ошибка',
							status: 'ERROR',
						},
					},
				]
			})
	},
})

export const {
	setToggleCreateTask,
	setToggleCreateProject,
	setToggleEditProfile,
	setToggleWarningMessage,
	setDeleteWarning,
	setToggleShowNoteCheckPass,
	setToggleAgreeToChangePassword,
	setToggleShowChangePasswordInEdit,
	setToggleCheckPasswordToChangeIt,
	setToggleEditTask,
	setToggleShowCreateStatus,
	setToggleShowOpenProject,
	setToggleShowOpenNoteDelete,
	setToggleTransferToTrashTask,
	setToggleTransferToTrashProject,
	setWhatChangeTaskOrProject,
	setToggleShowOpenTemporRemove,
	setIsProjectGet,
	setToggleCheckLogin,
	setDeleteFriendToggle,
	setToggleUpdatePasswordWindow,
	setToggleEditProject,
	setIsAuth,
} = ToggleSlice.actions
export default ToggleSlice.reducer
