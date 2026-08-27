import React from 'react'
import './style.scss'

import TemporaryRemoval from '../../HOOKS/TemporaryRemoval'

import { setToggleShowOpenTemporRemove } from '../../redux/slices/OthersToggle'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import {
	fetchGetTransferTaskToTrash,
	fetchDeleteTransferTaskToTrash,
	setFilterTrashTask,
	fetchSaveTransferTaskToTrash,
} from '../../redux/slices/TemporRemoveTask'

import useProjectHook from '../../HOOKS/ProjectHook'

import { setTask } from '../../redux/slices/TaskSlise'

import type { TemporaryRemovalTask } from '../../types/task.types'

import { X } from 'lucide-react'
import { CloudBackup } from 'lucide-react'

export default function RemoveTask() {
	const dispatch = useDispatch<AppDispatch>()
	const { TaskDelete } = TemporaryRemoval()
	const { saveIdForOpenProject } = useProjectHook()
	const dateNow = new Date()

	React.useEffect(() => {
		dispatch(
			fetchGetTransferTaskToTrash({
				id_project: saveIdForOpenProject,
			}),
		)
	}, [])

	const onClickDeleteTask = (id: string) => {
		dispatch(fetchDeleteTransferTaskToTrash({ id_task: id }))
		dispatch(setFilterTrashTask(id))
	}

	const onClickSaveTask = (obj: TemporaryRemovalTask) => {
		dispatch(fetchSaveTransferTaskToTrash({ id_task: obj.id_task }))
		dispatch(setFilterTrashTask(obj.id_task))
		dispatch(setTask(obj)) // добавляю в список задач восстановленную
	}

	return (
		<div className='common-block-back container'>
			<div className='remove-it'>
				<span
					className='block-close'
					onClick={() => dispatch(setToggleShowOpenTemporRemove(false))}
				></span>
				<p className='title'>Удаленные задачи</p>
				<div className='remove-it_block'>
					{TaskDelete && TaskDelete.length > 0 ? (
						<ul className='remove-it_list'>
							{TaskDelete.map(obj => (
								<li className='remove-it_item' key={obj.id_task}>
									<label className='remove-common_label'>
										Название
										<p className='remove-common_item'>{obj.name}</p>
									</label>
									<label className='remove-common_label'>
										Описание
										<p className='remove-common_item remove-it-desc'>
											{obj.description}
										</p>
									</label>
									<label className='remove-common_label'>
										Дата окончания
										<p className='remove-common_item'>{obj.dateEnd}</p>
									</label>
									<div className='remove-it_block_btns'>
										<button
											className='btn-send remove-it_btn remove'
											onClick={() => onClickDeleteTask(obj.id_task)}
										>
											<X className='icon-black' />
										</button>
										{dateNow <= new Date(obj.dateEnd) && obj.isCreator && (
											<button
												className='btn-send remove-it_btn save'
												onClick={() => onClickSaveTask(obj)}
											>
												<CloudBackup className='icon-black' />
											</button>
										)}
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className=''>Задач нет</p>
					)}
				</div>
			</div>
		</div>
	)
}
