import { useToggleHook } from '../../HOOKS/ToggleHook'
import {
	setToggleShowOpenNoteDelete,
	setToggleTransferToTrashTask,
	setToggleTransferToTrashProject,
	setDeleteFriendToggle,
} from '../../redux/slices/OthersToggle'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'

export default function NoteDelete() {
	const { whatChangeTaskOrProject } = useToggleHook()
	const dispatch = useDispatch<AppDispatch>()

	const onClickTransferToTrash = () => {
		if (whatChangeTaskOrProject === 'F') {
			dispatch(setDeleteFriendToggle(true))
		}
		if (whatChangeTaskOrProject === 'T') {
			dispatch(setToggleTransferToTrashTask(true))
		} else {
			dispatch(setToggleTransferToTrashProject(true))
		}

		dispatch(setToggleShowOpenNoteDelete(false))
	}

	return (
		<div className='note-check'>
			<div className='note-check-block container'>
				<div className='note-check-text'>
					{whatChangeTaskOrProject === 'F'
						? `Вы точно хотите удалить друга`
						: `Вы точно хотите переместить ${whatChangeTaskOrProject === 'T' ? 'задачу' : 'проект'} в корзину?`}
				</div>
				<div className='note-check-choice'>
					<div
						className='note-check-btn'
						onClick={() => onClickTransferToTrash()}
					>
						Да
					</div>
					<div
						className='note-check-btn'
						onClick={() => dispatch(setToggleShowOpenNoteDelete(false))}
					>
						Нет
					</div>
				</div>
			</div>
		</div>
	)
}
