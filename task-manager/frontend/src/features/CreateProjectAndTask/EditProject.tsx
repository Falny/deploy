import React from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
import {
	setToggleWarningMessage,
	setToggleEditProject,
} from '../../redux/slices/OthersToggle'
import {
	setName,
	setProject,
	setDescription,
	setAdminOfProject,
	fetchEditProject,
} from '../../redux/slices/ProjectSlice'
import useProjectHook from '../../HOOKS/ProjectHook'
import ProfileGetHook from '../../HOOKS/ProfileGetHook'

import type { AppDispatch } from '../../redux/store'

export default function CreateProject() {
	const {
		saveIdForOpenProject,
		projectName,
		projectDescription,
		projectActiveAdmin,
	} = useProjectHook()
	const { getProfileFriend, getProfileLogin } = ProfileGetHook()

	const [toggleOpenSelect, setToggleOpenSelect] = React.useState(false)
	const [deletePeople, setDeletePeople] = React.useState<string[]>([]) // список удаленных людей из проекта, нужно для удаления активных проектов из профилей этих людей

	const dispatch = useDispatch<AppDispatch>()

	const refPopUp = React.useRef<HTMLUListElement>(null)

	const onCloseProject = () => {
		dispatch(setToggleEditProject(false))
		dispatch(setProject())
	}

	const handleEditProject = async () => {
		if (projectName.length === 0) {
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

		const project = {
			id_project: saveIdForOpenProject,
			name: projectName,
			description: projectDescription,
			adminOfProject: projectActiveAdmin,
			deletePeople: deletePeople,
		}

		await dispatch(fetchEditProject(project))
		dispatch(setProject())
		onCloseProject()
		setDeletePeople([])
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
		setDeletePeople(prev => [...prev, name])
		dispatch(setAdminOfProject(name))
		e.stopPropagation()
	}

	const onClickAddPeople = (name: string) => {
		setDeletePeople(prev => prev.filter(el => el !== name))
		dispatch(setAdminOfProject(name))
	}

	return (
		<div className='common-block-back' onClick={e => clickDeletePopUp(e)}>
			<div className='create_block container'>
				<div className='block-close' onClick={() => onCloseProject()}></div>
				<input
					type='text'
					value={projectName}
					className='create_block-input'
					placeholder='Название..'
					onChange={e => dispatch(setName(e.target.value))}
				/>
				<textarea
					className='create_block-input create_block-textarea'
					name=''
					id=''
					placeholder='Описание..'
					value={projectDescription}
					onChange={e => dispatch(setDescription(e.target.value))}
				></textarea>
				{/* SELECT */}
				<label className='create_label'>
					Админы проекта
					<ul
						className='create-select'
						onClick={() => setToggleOpenSelect(!toggleOpenSelect)}
					>
						{projectActiveAdmin && projectActiveAdmin.length > 0
							? projectActiveAdmin.map((friend, index) => (
									<li className='create-choice' key={index}>
										<p className='create-choice_text'>{friend}</p>
										{getProfileLogin === friend ? (
											''
										) : (
											<span
												className='mini-close'
												onClick={e => onClickDeleteFriend(friend, e)}
											></span>
										)}
									</li>
								))
							: 'Выберите админов'}
					</ul>
					<ul
						className={`create-option ${toggleOpenSelect ? 'active' : 'inactive'}`}
						ref={refPopUp}
					>
						{getProfileFriend && getProfileFriend ? (
							getProfileFriend.map((friend, index) => (
								<li
									className='create-item'
									key={index}
									onClick={() => onClickAddPeople(friend)}
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
				<button className='btn-send' onClick={() => handleEditProject()}>
					Обновить
				</button>
			</div>
		</div>
	)
}
