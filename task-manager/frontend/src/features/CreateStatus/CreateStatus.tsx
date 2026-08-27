import './style.scss'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import {
	setToggleShowCreateStatus,
	setToggleWarningMessage,
} from '../../redux/slices/OthersToggle'
import {
	setAddStatus,
	fetchUpdateStatus,
	setStatus,
	setColor,
} from '../../redux/slices/StatusSlice'
import useStatusHook from '../../HOOKS/useStatusHook'

export default function CreateStatus() {
	const dispatch = useDispatch<AppDispatch>()

	const { statusAdd, color } = useStatusHook()

	const onClickSendStatus = async () => {
		if (statusAdd.length <= 0) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: { text: 'Введите значение', status: 'ERROR' },
				}),
			)
			return
		}
		if (color) {
			await dispatch(fetchUpdateStatus({ statusAdd, color }))
			dispatch(setToggleShowCreateStatus(false))
			dispatch(setStatus())
			dispatch(setAddStatus(''))
		}
	}

	return (
		<div className='create-status'>
			<div className='create-status_block container'>
				<div
					className='block-close'
					onClick={() => dispatch(setToggleShowCreateStatus(false))}
				></div>
				<label className='create-status_label'>
					Создание статуса
					<input
						type='text'
						className='create-status_input'
						value={statusAdd}
						onChange={e => dispatch(setAddStatus(e.target.value))}
					/>
				</label>
				<label className='create-status_label color-status'>
					Выберите цвет статуса
					<div
						className='create-status_color'
						style={{ backgroundColor: color }}
					></div>
					<input
						type='color'
						value={color}
						onChange={e => dispatch(setColor(e.target.value))}
						className='create-status_choice-color'
					/>
				</label>
				<button
					className='btn-send create-status_btn'
					onClick={() => onClickSendStatus()}
				>
					Создать статус
				</button>
			</div>
		</div>
	)
}
