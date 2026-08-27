import React from 'react'
import './style.scss'

import {
	fetchGetProject,
	setOpenProjectId,
} from '../../redux/slices/ProjectSlice'

import useProjectHook from '../../HOOKS/ProjectHook'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

import {
	setToggleShowOpenProject,
	setToggleCreateProject,
} from '../../redux/slices/OthersToggle'
import { useToggleHook } from '../../HOOKS/ToggleHook'
import { fetchLoginProfile } from '../../redux/slices/GetProfileSlice'

export default function Project() {
	const dispatch = useDispatch<AppDispatch>()
	const { projectForSend } = useProjectHook()
	const [togglePopUp, setTogglePopUp] = React.useState<boolean[]>(
		Array.from({ length: 30 }, () => false),
	)

	const { toggleCreateProject, isProjectGet } = useToggleHook()

	React.useEffect(() => {
		dispatch(fetchGetProject())
		dispatch(fetchLoginProfile())
	}, [toggleCreateProject])

	const onClickOpenProject = (id: string) => {
		dispatch(setToggleShowOpenProject(true))
		dispatch(setOpenProjectId(id))
	}

	const onMouseHover = (index_: number) => {
		setTogglePopUp(prev =>
			prev.map((el, index) => (index === index_ ? !el : el)),
		)
	}

	return (
		<div className='project container'>
			<div className='project-header'>
				<p className='title'>Проекты</p>
				<div className='header-task'>
					<div
						className='create-something_btn header-project_create-btn'
						onClick={() =>
							dispatch(setToggleCreateProject(!toggleCreateProject))
						}
					>
						<span className='inner-line'></span>
						<span className='inner-line'></span>
					</div>
				</div>
			</div>
			<ul className={`project-list`}>
				{projectForSend &&
					projectForSend.map((obj, index) => (
						<li
							className='project-item'
							key={obj.id_project}
							onClick={() => {
								!isProjectGet && onClickOpenProject(obj.id_project) // если проекты все загрузились то я могу открывать
							}}
						>
							<div className='project-item_block'>
								<p className='project-item_common project-item_name'>
									{obj.name}
								</p>
								<textarea
									className='project-item_common project-item_description'
									defaultValue={obj.description}
									disabled
								></textarea>
								<div
									className='project-item_count-people'
									onMouseEnter={() => onMouseHover(index)}
									onMouseLeave={() => onMouseHover(index)}
								>
									{obj.adminOfProject.length}+
								</div>
								<ul
									className={`project-item_people-list ${togglePopUp[index] ? 'active' : 'inactive'}`}
								>
									{obj.adminOfProject.map((people, index) => (
										<li className={`project-item_people-item `} key={index}>
											{people}
										</li>
									))}
								</ul>
							</div>
						</li>
					))}
			</ul>
		</div>
	)
}
