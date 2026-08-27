import React from 'react'
import { setToggleUpdatePasswordWindow } from '../../redux/slices/OthersToggle'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { fetchUpdatePassword } from '../../redux/slices/CheckPasswordSlice'

export default function UpdatePassword() {
	const [password, setPassword] = React.useState<string>('')
	const dispatch = useDispatch<AppDispatch>()

	const onClickPassword = () => {
		dispatch(fetchUpdatePassword({ password }))
	}

	return (
		<div className='check-pass-edit container'>
			<div className='check-pass-edit-block container'>
				<span
					className='block-close check-pass-btn-close'
					onClick={() => dispatch(setToggleUpdatePasswordWindow(false))}
				></span>
				<label className='check-pass-edit_label'>
					Введите новый пароль
					<input
						type='text'
						className='check-pass-edit_input'
						onChange={e => setPassword(e.target.value)}
					/>
				</label>
				<button
					className='check-pass-edit_btn'
					onClick={() => onClickPassword()}
				>
					Отправить
				</button>
			</div>
		</div>
	)
}
