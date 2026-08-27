import React from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from '../../redux/store'
import {
	setToggleCreateTask,
	setToggleWarningMessage,
} from '../../redux/slices/OthersToggle'
import {
	setTasksNull,
	setName,
	setDescription,
	setPeopleInProject,
	setStatusTask,
	setClearPeopleInProject,
	setDateEnd,
	fetchCreateTask,
	setTask,
} from '../../redux/slices/TaskSlise'
import useProjectHook from '../../HOOKS/ProjectHook'
import { useTasksHook } from '../../HOOKS/TasksHook'
import useStatusHook from '../../HOOKS/useStatusHook'
import {
	fetchGetStatus,
	setDeleteStatus,
	fetchDeleteStatus,
} from '../../redux/slices/StatusSlice'

import { setToggleShowCreateStatus } from '../../redux/slices/OthersToggle'

import ProfileGetHook from '../../HOOKS/ProfileGetHook'

export default function CreateTask() {
	const [toggleOpenSelect, setToggleOpenSelect] = React.useState(false) // селект для отображения участников проекта
	const [toggleTaskFor, setToggleTaskFor] = React.useState(false) // тогл для обозначения задачи только для себя или еще кого-то
	const [toggleStatus, setToggleStatus] = React.useState(false)
	const refPopUp = React.useRef<HTMLUListElement>(null)
	const refPopUpStatus = React.useRef<HTMLUListElement>(null)

	const dispatch = useDispatch<AppDispatch>()

	const { TasksFields } = useTasksHook()
	const { projectForSend, saveIdForOpenProject } = useProjectHook()
	const { status, color } = useStatusHook()
	const { getProfileLogin } = ProfileGetHook()

	// отфильтровываю участников проекта от логина создателя
	const admin = projectForSend
		.filter(obj => obj.id_project === saveIdForOpenProject)[0]
		.adminOfProject.filter(el => el !== getProfileLogin)

	// достаю статусы
	React.useEffect(() => {
		dispatch(fetchGetStatus())
		dispatch(setTasksNull())
	}, [])

	// скрытие открывания блока с участниками
	const clickDeletePopUp = (e: React.MouseEvent) => {
		if (
			toggleOpenSelect &&
			refPopUp.current &&
			!refPopUp.current.contains(e.target as Node)
		) {
			setToggleOpenSelect(false)
		}

		if (
			toggleStatus &&
			refPopUpStatus.current &&
			!refPopUpStatus.current.contains(e.target as Node)
		) {
			setToggleStatus(false)
		}
	}

	// удалить имя из участников проекта
	const onClickDeleteFriend = (
		name: string,
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		dispatch(setPeopleInProject(name))
		e.stopPropagation()
	}

	const onClickClearStatus = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		dispatch(setStatusTask(''))
		e.stopPropagation()
	}

	// закрыть окно создания задачи
	const onCloseProject = () => {
		dispatch(setToggleCreateTask(!setToggleCreateTask))
		dispatch(setTasksNull())
	}

	const onClickToggleFor = () => {
		setToggleTaskFor(!toggleTaskFor)
		if (!toggleTaskFor) {
			dispatch(setClearPeopleInProject())
		}
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

	const onClickCreateTask = () => {
		if (TasksFields.name.length === 0) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Введите название задачи',
						status: 'ERROR',
					},
				}),
			)
			return
		} else if (TasksFields.dateEnd.length === 0) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Введите окончание задачи',
						status: 'ERROR',
					},
				}),
			)
			return
		} else if (TasksFields.status.length === 0) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Введите статус задачи',
						status: 'ERROR',
					},
				}),
			)
			return
		}

		const task = {
			id_project: saveIdForOpenProject,
			name: TasksFields.name,
			description: TasksFields.description,
			dateStart:
				new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
			dateEnd: TasksFields.dateEnd,
			status: TasksFields.status + ':' + color,
			peopleInProject: TasksFields.peopleInProject,
		}

		dispatch(fetchCreateTask({ task }))
		dispatch(setTask(task))
		dispatch(setToggleCreateTask(false))
		dispatch(setTasksNull())
	}

	return (
		<div className='common-block-back' onClick={e => clickDeletePopUp(e)}>
			<div className='create_block container'>
				<div className='block-close' onClick={() => onCloseProject()}></div>
				<input
					type='text'
					value={TasksFields.name}
					className='create_block-input'
					placeholder='Название..'
					onChange={e => dispatch(setName(e.target.value))}
				/>
				<textarea
					className='create_block-input create_block-textarea'
					name=''
					id=''
					placeholder='Описание..'
					value={TasksFields.description}
					onChange={e => dispatch(setDescription(e.target.value))}
				></textarea>
				<div className='create-for'>
					<div className='create-for_block' onClick={() => onClickToggleFor()}>
						<div
							className={`create-for_block-input ${toggleTaskFor && 'checked'}`}
						></div>
						<div className='create-for_block-text'>
							Задача не только для себя?
						</div>
					</div>

					{/* SELECT */}
					{toggleTaskFor && (
						<label className='create_label'>
							<ul
								className='create-select'
								onClick={() => setToggleOpenSelect(!toggleOpenSelect)}
							>
								{TasksFields.peopleInProject &&
								TasksFields.peopleInProject.length > 0
									? TasksFields.peopleInProject.map((friend, index) => (
											<li className='create-choice' key={index}>
												<p className='create-choice_text'>{friend}</p>
												<span
													className='mini-close'
													onClick={e => onClickDeleteFriend(friend, e)}
												></span>
											</li>
										))
									: 'Выберите исполнителей'}
							</ul>
							<ul
								className={`create-option ${toggleOpenSelect ? 'active' : 'inactive'}`}
								ref={refPopUp}
							>
								{admin && admin.length > 0 ? (
									admin.map((friend, index) => (
										<li
											className='create-item'
											key={index}
											onClick={() => dispatch(setPeopleInProject(friend))}
										>
											{friend}
										</li>
									))
								) : (
									<p className='create-empty'>В проекте никого нет</p>
								)}
							</ul>
						</label>
					)}
				</div>
				{/* SELECT STATUS */}
				<div className='status'>
					<div
						className='status_status'
						onClick={() => setToggleStatus(!toggleStatus)}
					>
						<p className='status_status-choice'>
							{TasksFields.status
								? TasksFields.status.split(':')[0]
								: 'Выберите статус'}
						</p>
						{TasksFields.status && (
							<span
								className='mini-close'
								onClick={e => onClickClearStatus(e)}
							></span>
						)}
					</div>
					<div
						className='create-something_btn create-status-btn'
						onClick={() => dispatch(setToggleShowCreateStatus(true))}
					>
						<div className='inner-line'></div>
						<div className='inner-line'></div>
					</div>
					<ul
						className={`create-select-status ${toggleStatus ? 'active' : 'inactive'}`}
						ref={refPopUpStatus}
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
				<label className='create-label_date-end'>
					Дата окончания
					<input
						type='date'
						value={TasksFields.dateEnd}
						className='create_block-input'
						onChange={e => dispatch(setDateEnd(e.target.value))}
					/>
				</label>
				<button className='btn-send' onClick={() => onClickCreateTask()}>
					Создать
				</button>
			</div>
		</div>
	)
}
