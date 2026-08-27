import React from 'react'
import './style.scss'

import { NotebookPen, Check, Trash2 } from 'lucide-react'
import { useTasksHook } from '../../HOOKS/TasksHook'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import {
	setToggleEditTask,
	setToggleShowCreateStatus,
	setToggleShowOpenNoteDelete,
	setWhatChangeTaskOrProject,
	setToggleTransferToTrashTask,
} from '../../redux/slices/OthersToggle'
import {
	fetchUpdateTask,
	setName,
	setDescription,
	setStatusTask,
	setPeopleInProject,
	setDeleteTask,
	fetchTransferTaskToTrash,
} from '../../redux/slices/TaskSlise'
import { setRemoveTask } from '../../redux/slices/TemporRemoveTask'
import {
	fetchGetStatus,
	setDeleteStatus,
	fetchDeleteStatus,
} from '../../redux/slices/StatusSlice'
import useStatusHook from '../../HOOKS/useStatusHook'
import useProjectHook from '../../HOOKS/ProjectHook'
import ProfileGetHook from '../../HOOKS/ProfileGetHook'
import { useToggleHook } from '../../HOOKS/ToggleHook'

export default function CreateTask() {
	// смена иконки на сохранить и редактировать
	const [toggleEditSave, setToggleEditSave] = React.useState(true)
	const [toggleOpenStatus, setToggleOpenStatus] = React.useState(false)
	const [toggleOpenAdminProject, setToggleOpenAdminProject] =
		React.useState(false)

	const refStatus = React.useRef<HTMLUListElement>(null)
	const refAdmin = React.useRef<HTMLUListElement>(null)

	const { toggleTransferToTrashTask } = useToggleHook()
	const { TasksFields, TasksHook } = useTasksHook()
	const { status, color } = useStatusHook()
	const { saveIdForOpenProject, projectForSend } = useProjectHook()
	const { getProfileLogin } = ProfileGetHook()
	const dispatch = useDispatch<AppDispatch>()

	// отфильтровываю участников проекта
	const admin = projectForSend
		.filter(obj => obj.id_project === saveIdForOpenProject)[0]
		.adminOfProject.filter(el => el !== getProfileLogin)

	// начальный состав того кто был участником задачи
	const initAdminOfTask = TasksHook.filter(
		obj => obj.id_task === TasksFields.id_task,
	)[0].peopleInProject

	// перенос задачи в удаленное и удаление ее из обычных задач
	React.useEffect(() => {
		if (toggleTransferToTrashTask) {
			dispatch(
				setRemoveTask({
					id_project: saveIdForOpenProject,
					id_task: TasksFields.id_task,
					name: TasksFields.name,
					description: TasksFields.description,
					dateStart: TasksFields.dateStart,
					dateEnd: TasksFields.dateEnd,
					status: TasksFields.status,
					peopleInProject: TasksFields.peopleInProject,
				}),
			)
			dispatch(setToggleTransferToTrashTask(false))
			dispatch(setToggleEditTask(false))
			dispatch(setDeleteTask(TasksFields.id_task))
			dispatch(fetchTransferTaskToTrash({ id_task: TasksFields.id_task }))
		}
	}, [toggleTransferToTrashTask])

	React.useEffect(() => {
		dispatch(fetchGetStatus())
	}, [])

	const onClickUpdateTask = async () => {
		// список для удаленных участников группы
		let deletePeople: string[] = []
		if (initAdminOfTask.length > 0) {
			for (const login1 of initAdminOfTask) {
				for (const login2 of TasksFields.peopleInProject) {
					if (login1 === login2) continue
					deletePeople = [...deletePeople, login1]
				}
			}
		}

		const task = {
			id_project: saveIdForOpenProject,
			id_task: TasksFields.id_task,
			name: TasksFields.name,
			description: TasksFields.description,
			dateStart: TasksFields.dateStart,
			dateEnd: TasksFields.dateEnd,
			status: TasksFields.status + ':' + color,
			peopleInProject: TasksFields.peopleInProject,
			deletePeopleFromTask: deletePeople,
		}

		dispatch(fetchUpdateTask(task))
		dispatch(setToggleEditTask(false))
	}

	const onClickOutside = (e: React.MouseEvent) => {
		const clickOutside = refStatus.current
		const clickOutsideAdmin = refAdmin.current
		if (
			toggleOpenStatus &&
			clickOutside &&
			!clickOutside.contains(e.target as Node)
		) {
			setToggleOpenStatus(false)
		}

		if (
			toggleOpenAdminProject &&
			clickOutsideAdmin &&
			!clickOutsideAdmin.contains(e.target as Node)
		) {
			setToggleOpenAdminProject(false)
		}
	}

	const onClickDeleteFriend = (
		name: string,
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		dispatch(setPeopleInProject(name))
		e.stopPropagation()
	}

	const onClickTransferToTrash = () => {
		dispatch(setWhatChangeTaskOrProject('T'))
		dispatch(setToggleShowOpenNoteDelete(true))
	}

	// удаление статуса
	const onClickDeleteStatus = (
		e: React.MouseEvent<HTMLSpanElement>,
		el: string,
	) => {
		dispatch(setDeleteStatus(el))
		dispatch(fetchDeleteStatus({ status: el }))
		e.stopPropagation()
	}

	return (
		<div className='common-block-back' onClick={e => onClickOutside(e)}>
			<div className='create_block container'>
				<div
					className='block-close'
					onClick={() => dispatch(setToggleEditTask(false))}
				></div>
				<div className='container-icons'>
					{toggleEditSave ? (
						<NotebookPen
							className='icon'
							onClick={() => setToggleEditSave(false)}
						/>
					) : (
						<Check className='icon' onClick={() => setToggleEditSave(true)} />
					)}
					{TasksFields.isCreator && (
						<Trash2 className='icon' onClick={() => onClickTransferToTrash()} />
					)}
				</div>
				<input
					type='text'
					value={TasksFields.name}
					className={`${!toggleEditSave && 'edit-cursor'} create_block-input`}
					readOnly={toggleEditSave}
					onChange={e => dispatch(setName(e.target.value))}
				/>
				<textarea
					className={`${!toggleEditSave && 'edit-cursor'} create_block-input create_block-textarea edit-desc`}
					name=''
					id=''
					placeholder='Описание..'
					value={TasksFields.description}
					readOnly={toggleEditSave}
					onChange={e => dispatch(setDescription(e.target.value))}
				></textarea>

				{/* SELECT STATUS */}
				<div className='status'>
					<label
						className={`${toggleEditSave && 'edit-status'} ${!toggleEditSave && 'edit-cursor'} create-label_date-end`}
						onClick={() => setToggleOpenStatus(!toggleOpenStatus)}
					>
						Статус задачи
						<p className='create_block-input '>
							{TasksFields.status.split(':')[0]}
						</p>
						{/* <span className='mini-close'></span> */}
					</label>
					{!toggleEditSave && (
						<div
							className='create-something_btn create-status-btn'
							onClick={() => dispatch(setToggleShowCreateStatus(true))}
						>
							<div className='inner-line'></div>
							<div className='inner-line'></div>
						</div>
					)}

					<ul
						className={`create-select-status ${!toggleEditSave && toggleOpenStatus ? 'active' : 'inactive'}`}
						ref={refStatus}
					>
						{status &&
							status.split(',').map((el, index) => (
								<li
									className='create-item'
									key={index}
									onClick={() => dispatch(setStatusTask(el))}
								>
									<p className='create-item_text'>{el.split(':')[0]}</p>
									<span
										className='mini-close'
										onClick={e => onClickDeleteStatus(e, el)}
									></span>
								</li>
							))}
					</ul>
				</div>
				{/* END SELECT */}
				<label
					className={`create-label_date-end ${!toggleEditSave && 'edit-status_not-active'}`}
				>
					Дата начала
					<p className='create_block-input'>{TasksFields.dateStart}</p>
				</label>
				<label className='create-label_date-end'>
					Дата окончания
					<p className='create_block-input'>
						{TasksFields.dateEnd.split('-').reverse().join('.')}
					</p>
				</label>
				{/* SELECT ADMIN PROJECT */}
				{(TasksFields.peopleInProject.length > 0 || !toggleEditSave) && (
					<label
						className={`${!toggleEditSave && 'edit-cursor'} create_label create-label_date-end `}
						onClick={() => setToggleOpenAdminProject(!toggleOpenAdminProject)}
					>
						Участники задачи
						<ul className='create-select create_block-input'>
							{TasksFields.peopleInProject.map(login => (
								<li className='create-choice' key={login}>
									{login}
									{getProfileLogin === login
										? ''
										: TasksFields.isCreator &&
											!toggleEditSave && (
												<span
													className='mini-close'
													onClick={e => onClickDeleteFriend(login, e)}
												></span>
											)}
								</li>
							))}
						</ul>
						{TasksFields.isCreator && (
							<ul
								className={`create-option ${toggleOpenAdminProject && !toggleEditSave ? 'active' : 'inactive'}`}
								ref={refAdmin}
							>
								{admin.map(login => (
									<li
										className='create-item'
										key={login}
										onClick={() => dispatch(setPeopleInProject(login))}
									>
										{login}
									</li>
								))}
							</ul>
						)}
					</label>
				)}

				{!toggleEditSave && (
					<button className='btn-send' onClick={() => onClickUpdateTask()}>
						Обновить
					</button>
				)}
			</div>
		</div>
	)
}
