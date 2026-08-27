import './style.scss'

import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import {
	setToggleAgreeToChangePassword,
	setToggleShowNoteCheckPass,
	setToggleShowChangePasswordInEdit,
} from '../../redux/slices/OthersToggle'

export default function NoteCheckPass() {
	const dispatch = useDispatch<AppDispatch>()

	const onClickNote = () => {
		dispatch(setToggleAgreeToChangePassword(true))
		dispatch(setToggleShowNoteCheckPass(false))
		dispatch(setToggleShowChangePasswordInEdit(true))
	}

	return (
		<div className='note-check'>
			<div className='note-check-block container'>
				<div className='note-check-text'>Вы точно хотите поменять пароль?</div>
				<div className='note-check-choice'>
					<div className='note-check-btn' onClick={() => onClickNote()}>
						Да
					</div>
					<div
						className='note-check-btn'
						onClick={() => dispatch(setToggleShowNoteCheckPass(false))}
					>
						Нет
					</div>
				</div>
			</div>
		</div>
	)
}
