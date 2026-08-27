import React from 'react'
import './style.scss'

import useProjectHook from '../../HOOKS/ProjectHook'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'

import {
	Trash2,
	NotebookPen,
	ListSortAscending,
	ListSortDescending,
} from 'lucide-react'

import {
	setToggleShowOpenProject,
	setToggleCreateTask,
	setToggleEditTask,
	setToggleShowOpenTemporRemove,
	setWhatChangeTaskOrProject,
	setToggleShowOpenNoteDelete,
	setToggleTransferToTrashProject,
	setToggleEditProject,
} from '../../redux/slices/OthersToggle'

import { useTasksHook } from '../../HOOKS/TasksHook'
import {
	fetchGetTasks,
	setTaskClear,
	setOneTaskForOpen,
	setTasksNull,
} from '../../redux/slices/TaskSlise'

import type { TaskExportType } from '../../types/task.types'
import {
	setAdminProjectSetAll,
	setRemoveProject,
	fetchDeleteProject,
	setOneProjectForOpen,
} from '../../redux/slices/ProjectSlice'

import { setCleanTaskTrash } from '../../redux/slices/TemporRemoveTask'
import { useToggleHook } from '../../HOOKS/ToggleHook'

export default React.memo(function OpenProject() {
	const [toggleEditSave, _] = React.useState(true)
	const [toggleSort, setToggleSort] = React.useState(false)
	const [sortList, setSortList] = React.useState<TaskExportType[]>([])

	const { projectForSend, saveIdForOpenProject } = useProjectHook()
	const { TasksHook } = useTasksHook() // массив с задачами
	const { toggleTransferToTrashProject } = useToggleHook()
	const dispatch = useDispatch<AppDispatch>()

	React.useEffect(() => {
		setSortList([...TasksHook]) // копирую массив потому что он сортироваться будет
	}, [TasksHook])

	const project = projectForSend.filter(
		obj => obj.id_project === saveIdForOpenProject,
	)[0]

	React.useEffect(() => {
		dispatch(fetchGetTasks({ id_project: saveIdForOpenProject }))
	}, [])

	React.useEffect(() => {
		if (toggleTransferToTrashProject) {
			dispatch(setRemoveProject(saveIdForOpenProject))

			dispatch(setToggleTransferToTrashProject(false))
			dispatch(fetchDeleteProject({ id_project: saveIdForOpenProject }))
			dispatch(setToggleShowOpenProject(false))
		}
	}, [toggleTransferToTrashProject])

	const onClickCloseOpenProject = () => {
		dispatch(setTaskClear())
		dispatch(setTasksNull())
		dispatch(setToggleShowOpenProject(false))
	}

	const onClickOpenTask = (obj: TaskExportType) => {
		// добавляю админов проекта для редактирования участников в задаче
		dispatch(setAdminProjectSetAll(project.adminOfProject))
		dispatch(setToggleEditTask(true))
		dispatch(
			setOneTaskForOpen({
				id_task: obj.id_task,
				name: obj.name,
				description: obj.description,
				dateStart: obj.dateStart,
				dateEnd: obj.dateEnd,
				status: obj.status,
				peopleInProject: obj.peopleInProject,
				isCreator: obj.isCreator,
			}),
		)
	}

	const onClickOpenTrash = () => {
		dispatch(setToggleShowOpenTemporRemove(true))
		dispatch(setCleanTaskTrash())
	}

	const onClickTransferToTrash = () => {
		dispatch(setWhatChangeTaskOrProject('P'))
		dispatch(setToggleShowOpenNoteDelete(true))
	}

	const openEditProject = () => {
		dispatch(
			setOneProjectForOpen({
				projectOpenId: saveIdForOpenProject,
				name: project.name,
				description: project.description,
				adminOfProject: project.adminOfProject,
			}),
		)
		dispatch(setToggleEditProject(true))
	}

	const onClickSort = () => {
		setToggleSort(!toggleSort)
		if (toggleSort) {
			setSortList(
				[...TasksHook].sort((a, b) =>
					a.status.toLowerCase().localeCompare(b.status.toLowerCase()),
				),
			)
		} else {
			setSortList(
				[...TasksHook].sort((a, b) =>
					b.status.toLowerCase().localeCompare(a.status.toLowerCase()),
				),
			)
		}
	}

	return (
		<div className='common-block-back container'>
			<div className='open-project'>
				<span
					className='block-close'
					onClick={() => onClickCloseOpenProject()}
				></span>
				<div className='container-icons'>
					{project.isCreator && toggleEditSave && (
						<NotebookPen className='icon' onClick={() => openEditProject()} />
					)}
					{project.isCreator && (
						<Trash2 className='icon' onClick={() => onClickTransferToTrash()} />
					)}
				</div>
				<div className='open-project_block'>
					<div className='open-project_header open-project_back'>
						<h3 className='open-project_header-text'>Проект: {project.name}</h3>
						<p className='open-project_header-text'>{project.description}</p>
					</div>
				</div>
				<div className='open-project_block'>
					<div className='open-project_info open-project_back'>
						<div className='middle-block'>
							<div
								className='create-something_btn open-project_create-task'
								onClick={() => dispatch(setToggleCreateTask(true))}
							>
								<div className='inner-line'></div>
								<div className='inner-line'></div>
							</div>
							<div className='sort' onClick={() => onClickSort()}>
								{toggleSort ? (
									<ListSortAscending className='icon' />
								) : (
									<ListSortDescending className='icon' />
								)}
								По статусу
							</div>
						</div>
						<Trash2 className='icon' onClick={() => onClickOpenTrash()} />
					</div>
				</div>
				<div className='open-project_block task-scroll'>
					<ul className='open-project_task'>
						{sortList && sortList.length > 0 ? (
							sortList.map(obj => (
								<li
									className='open-project_task-item'
									key={obj.id_task}
									onClick={() => onClickOpenTask(obj)}
								>
									<p
										className='open-project_task-item_status'
										style={{ backgroundColor: obj.status.split(':')[1] }}
									>
										{obj.status.split(':')[0]}
									</p>
									<p className='open-project_task-item_text'>{obj.name}</p>
									<p className='open-project_task-item_text'>
										{obj.description}
									</p>
									<div className='open-project_task-item_block'>
										<p className='open-project_task-item_time'>
											{(
												(+new Date(obj.dateEnd) - +new Date()) /
												(1000 * 60 * 60 * 24)
											).toFixed(1)}{' '}
											дня
										</p>
										<p className='open-project_task-item_people'>
											{obj.peopleInProject.length}+
										</p>
									</div>
								</li>
							))
						) : (
							<p className=''>Задач нет</p>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
})
