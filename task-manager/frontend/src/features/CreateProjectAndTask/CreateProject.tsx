import React from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
import { useToggleHook } from '../../HOOKS/ToggleHook'
import {
	setToggleCreateProject,
	setIsProjectGet,
	setToggleWarningMessage,
} from '../../redux/slices/OthersToggle'
import {
	setName,
	setProject,
	setDescription,
	setAdminOfProject,
	setAddProject,
} from '../../redux/slices/ProjectSlice'
import useProjectHook from '../../HOOKS/ProjectHook'
import ProfileGetHook from '../../HOOKS/ProfileGetHook'

import { fetchCreateProject } from '../../redux/slices/ProjectSlice'
import type { AppDispatch } from '../../redux/store'

export default function CreateProject() {
	const { projectAll } = useProjectHook()
	const admin = projectAll.adminOfProject
	const { toggleCreateProject } = useToggleHook()
	const [toggleOpenSelect, setToggleOpenSelect] = React.useState(false)

	const dispatch = useDispatch<AppDispatch>()

	const { getProfileFriend, getProfileLogin } = ProfileGetHook()
	const refPopUp = React.useRef<HTMLUListElement>(null)

	const onCloseProject = () => {
		dispatch(setToggleCreateProject(!toggleCreateProject))
		dispatch(setProject())
	}

	const handleCreateProject = async () => {
		if (projectAll.name.length === 0) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Введите название проекта',
						status: 'ERROR',
					},
				}),
			)
			return
		}

		const date = new Date().toISOString().split('.')[0].split('T').join(' ')

		// добавляю логин самого пользователя
		const updataADminOfProject = [...projectAll.adminOfProject, getProfileLogin]

		const project = {
			name: projectAll.name,
			description: projectAll.description,
			dateStart: date,
			dateEnd: '', // потому что потом сам человек будет закрывать проект
			adminOfProject: updataADminOfProject,
		}

		await dispatch(
			fetchCreateProject({
				project: project,
			}),
		)
		dispatch(setIsProjectGet(true)) // говорю что не могу открывать проекты пока проекты подгружаются
		dispatch(setProject())
		dispatch(setAddProject(project))
		dispatch(setToggleCreateProject(!toggleCreateProject))
	}

	const clickDeletePopUp = (e: React.MouseEvent) => {
		if (
			toggleOpenSelect &&
			refPopUp.current &&
			!refPopUp.current.contains(e.target as Node)
		) {
			setToggleOpenSelect(false)
		}
	}

	const onClickDeleteFriend = (
		name: string,
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
	) => {
		dispatch(setAdminOfProject(name))
		e.stopPropagation()
	}

	return (
		<div className='common-block-back' onClick={e => clickDeletePopUp(e)}>
			<div className='create_block container'>
				<div className='block-close' onClick={() => onCloseProject()}></div>
				<input
					type='text'
					value={projectAll.name}
					className='create_block-input'
					placeholder='Название..'
					onChange={e => dispatch(setName(e.target.value))}
				/>
				<textarea
					className='create_block-input create_block-textarea'
					name=''
					id=''
					placeholder='Описание..'
					value={projectAll.description}
					onChange={e => dispatch(setDescription(e.target.value))}
				></textarea>
				{/* SELECT */}
				<label className='create_label'>
					Админы проекта
					<ul
						className='create-select'
						onClick={() => setToggleOpenSelect(!toggleOpenSelect)}
					>
						{admin && admin.length > 0
							? admin.map((friend, index) => (
									<li className='create-choice' key={index}>
										<p className='create-choice_text'>{friend}</p>
										<span
											className='mini-close'
											onClick={e => onClickDeleteFriend(friend, e)}
										></span>
									</li>
								))
							: 'Выберите админов'}
					</ul>
					<ul
						className={`create-option ${toggleOpenSelect ? 'active' : 'inactive'}`}
						ref={refPopUp}
					>
						{getProfileFriend && getProfileFriend.length > 0 ? (
							getProfileFriend.map((friend, index) => (
								<li
									className='create-item'
									key={index}
									onClick={() => dispatch(setAdminOfProject(friend))}
								>
									{friend}
								</li>
							))
						) : (
							<p className='create-empty'>Друзей пока нет</p>
						)}
					</ul>
				</label>
				{/* END SELECT */}
				<button className='btn-send' onClick={() => handleCreateProject()}>
					Создать проект
				</button>
			</div>
		</div>
	)
}
