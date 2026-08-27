import React from 'react'
import './style.scss'

import { Outlet } from 'react-router'

import { useToggleHook } from '../../HOOKS/ToggleHook'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { setDeleteWarning } from '../../redux/slices/OthersToggle'
import { handleGetProfile } from '../../redux/slices/GetProfileSlice'
import useWarningNoteHook from '../../HOOKS/useWarningNoteHook'

const OpenProject = React.lazy(() => import('../OpenProject/OpenProject'))
const EditProject = React.lazy(
	() => import('../../features/CreateProjectAndTask/EditProject'),
)
const UpdatePassword = React.lazy(
	() => import('../../features/ChangePassInEdit/UpdatePassword'),
)
const RemoveTask = React.lazy(() => import('../TemporRemove/RemoveTask'))
const EditTask = React.lazy(
	() => import('../../features/CreateProjectAndTask/EditTask'),
)
const CreateTask = React.lazy(
	() => import('../../features/CreateProjectAndTask/CreateTask'),
)
const CreateStatus = React.lazy(
	() => import('../../features/CreateStatus/CreateStatus'),
)
const ChangePassInEdit = React.lazy(
	() => import('../../features/ChangePassInEdit/ChangePassInEdit'),
)
const NoteDelete = React.lazy(
	() => import('../../shared/NoteDelete/NoteDelete'),
)
const SideMain = React.lazy(() => import('../SideMain/SideMain'))
const CreateProject = React.lazy(
	() => import('../../features/CreateProjectAndTask/CreateProject'),
)
const EditProfile = React.lazy(() => import('../EditProfile/EditProfile'))
const Warning = React.lazy(() => import('../../shared/Warning/Warning'))
const NoteCheckPass = React.lazy(
	() => import('../../shared/NoteDelete/NoteCheckPass'),
)

export default function MainPage() {
	const { warnings } = useWarningNoteHook()

	const {
		toggleCreateTask,
		toggleCreateProject,
		toggleEditProfile,
		toggleShowNoteCheckPass,
		toggleShowChangePasswordInEdit,
		toggleEditTask,
		toggleShowCreateStatus,
		toggleShowOpenProject,
		toggleShowOpenNoteDelete,
		toggleShowOpenTemporRemove,
		toggleUpdatePasswordWindow,
		toggleEditProject,
	} = useToggleHook()

	const dispatch = useDispatch<AppDispatch>()

	React.useEffect(() => {
		if (warnings.length > 0) {
			const timer = warnings.map(note =>
				setTimeout(() => {
					dispatch(setDeleteWarning(note.id))
				}, 1000),
			)

			return () => timer.forEach(time => clearTimeout(time))
		}
	}, [warnings])

	React.useEffect(() => {
		dispatch(handleGetProfile())
	}, [])

	return (
		<div className='main-page'>
			<span className='init-page_circle-1'></span>
			<span className='init-page_circle-2'></span>
			<span className='init-page_circle-3'></span>
			<span className='init-page_circle-4'></span>
			<SideMain />
			<Outlet />
			{toggleCreateProject && <CreateProject />}
			{toggleEditProfile && <EditProfile />}
			<div className='warnings-pull'>
				{warnings.map(note => (
					<Warning
						key={note.id}
						text={note.toggleWarningMessage?.text}
						status={note.toggleWarningMessage?.status}
					/>
				))}
			</div>
			{toggleShowNoteCheckPass && <NoteCheckPass />}
			{toggleShowChangePasswordInEdit && <ChangePassInEdit />}
			{toggleUpdatePasswordWindow && <UpdatePassword />}
			{toggleShowOpenProject && <OpenProject />}
			{toggleCreateTask && <CreateTask />}
			{toggleEditTask && <EditTask />}
			{toggleEditProject && <EditProject />}
			{toggleShowCreateStatus && <CreateStatus />}
			{toggleShowOpenTemporRemove && <RemoveTask />}
			{toggleShowOpenNoteDelete && <NoteDelete />}
		</div>
	)
}
