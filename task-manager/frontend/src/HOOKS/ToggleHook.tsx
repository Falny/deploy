import type { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

export const useToggleHook = () => {
	const toggleCreateTask = useSelector(
		(state: RootState) => state.toggle.toggleCreateTask,
	)
	const toggleCreateProject = useSelector(
		(state: RootState) => state.toggle.toggleCreateProject,
	)

	const toggleEditProfile = useSelector(
		(state: RootState) => state.toggle.toggleEditProfile,
	)

	const toggleShowNoteCheckPass = useSelector(
		(state: RootState) => state.toggle.toggleShowNoteCheckPass,
	)
	const toggleAgreeToChangePassword = useSelector(
		(state: RootState) => state.toggle.toggleAgreeToChangePassword,
	)
	const toggleShowChangePasswordInEdit = useSelector(
		(state: RootState) => state.toggle.toggleShowChangePasswordInEdit,
	)
	const toggleCheckPasswordToChangeIt = useSelector(
		(state: RootState) => state.toggle.toggleCheckPasswordToChangeIt,
	)
	const toggleEditTask = useSelector(
		(state: RootState) => state.toggle.toggleEditTask,
	)
	const toggleShowCreateStatus = useSelector(
		(state: RootState) => state.toggle.toggleShowCreateStatus,
	)
	const toggleShowOpenProject = useSelector(
		(state: RootState) => state.toggle.toggleShowOpenProject,
	)
	const toggleShowOpenNoteDelete = useSelector(
		(state: RootState) => state.toggle.toggleShowOpenNoteDelete,
	)
	const toggleTransferToTrashTask = useSelector(
		(state: RootState) => state.toggle.toggleTransferToTrashTask,
	)
	const toggleTransferToTrashProject = useSelector(
		(state: RootState) => state.toggle.toggleTransferToTrashProject,
	)
	const whatChangeTaskOrProject = useSelector(
		(state: RootState) => state.toggle.whatChangeTaskOrProject,
	)
	const toggleShowOpenTemporRemove = useSelector(
		(state: RootState) => state.toggle.toggleShowOpenTemporRemove,
	)
	const isProjectGet = useSelector(
		(state: RootState) => state.toggle.isProjectGet,
	)
	const toggleCheckLogin = useSelector(
		(state: RootState) => state.toggle.toggleCheckLogin,
	)
	const deleteFriend = useSelector(
		(state: RootState) => state.toggle.deleteFriend,
	)
	const toggleUpdatePasswordWindow = useSelector(
		(state: RootState) => state.toggle.toggleUpdatePasswordWindow,
	)
	const toggleEditProject = useSelector(
		(state: RootState) => state.toggle.toggleEditProject,
	)
	const isAuth = useSelector((state: RootState) => state.toggle.isAuth)

	return {
		isAuth,
		toggleCreateTask,
		toggleCreateProject,
		toggleEditProfile,
		toggleShowNoteCheckPass,
		toggleAgreeToChangePassword,
		toggleShowChangePasswordInEdit,
		toggleCheckPasswordToChangeIt,
		toggleEditTask,
		toggleShowCreateStatus,
		toggleShowOpenProject,
		toggleShowOpenNoteDelete,
		toggleTransferToTrashTask,
		toggleTransferToTrashProject,
		whatChangeTaskOrProject,
		toggleShowOpenTemporRemove,
		isProjectGet,
		toggleCheckLogin,
		deleteFriend,
		toggleUpdatePasswordWindow,
		toggleEditProject,
	}
}
