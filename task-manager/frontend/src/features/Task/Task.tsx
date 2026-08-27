import React from 'react'
import './style.scss'

import { fetchGetProject } from '../../redux/slices/ProjectSlice'

import useProjectHook from '../../HOOKS/ProjectHook'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

import { Timer } from 'lucide-react'

export default function Project() {
	const dispatch = useDispatch<AppDispatch>()
	const { projectForSend } = useProjectHook()

	React.useEffect(() => {
		dispatch(fetchGetProject())
	}, [])

	const convertDate = (date1: string) => {
		const days =
			(new Date(date1).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)

		const diff = new Date(date1).getTime() - new Date().getTime()

		if (days < 1) {
			return (
				Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + ' ч.'
			)
		}
		return Math.floor(days) + ' д.'
	}

	return (
		<div className='tasks container'>
			<ul className='tasks-list'>
				{projectForSend &&
					projectForSend.map(obj => (
						<li className='tasks-item' key={obj.id_project}>
							{/* <div className='task-item_block'>
										<p className='tasks-item_common-mini tasks-item_status'>
											{obj.status}
										</p>
									</div> */}
							<div className='task-item_block'>
								<p className='tasks-item_common tasks-item_name'>{obj.name}</p>
								<textarea
									className='tasks-item_common tasks-item_description'
									defaultValue={obj.description}
									disabled
								></textarea>
							</div>
							<div className='task-item_block'>
								<div className='task-item_footer'>
									<div className='task-item_block-time'>
										<Timer className='icon' />
										<p className='tasks-item_time'>
											{convertDate(obj.dateEnd)}
										</p>
									</div>
									<p className='tasks-item_common-mini tasks-item_name-user'></p>
								</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}
