import { configureStore } from '@reduxjs/toolkit'
import ToggleSlice from './slices/OthersToggle'
import ProjectSlice from './slices/ProjectSlice'
import GetProfileSlice from './slices/GetProfileSlice'
import RegistrationSlice from './slices/RegistrationSlice'
import handleCheckPassword from './slices/CheckPasswordSlice'
import SearchSlice from './slices/SearchFriendSlice'
import NotificationSlice from './slices/NotificationSlice'
import FriendSlice from './slices/FriendSlice'
import TaskSlice from './slices/TaskSlise'
import StatusSlice from './slices/StatusSlice'
import RemoveTaskSlice from './slices/TemporRemoveTask'
import LoginSlice from './slices/LoginSlice'
import DashBoard from './slices/DashboardSlice'

export const store = configureStore({
	reducer: {
		toggle: ToggleSlice,
		project: ProjectSlice,
		profile: GetProfileSlice,
		registration: RegistrationSlice,
		checkPassword: handleCheckPassword,
		searchFriend: SearchSlice,
		notification: NotificationSlice,
		friend: FriendSlice,
		task: TaskSlice,
		status: StatusSlice,
		removeTask: RemoveTaskSlice,
		login: LoginSlice,
		dashboard: DashBoard,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
