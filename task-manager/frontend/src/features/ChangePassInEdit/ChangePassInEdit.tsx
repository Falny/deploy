import React from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { setToggleShowChangePasswordInEdit } from '../../redux/slices/OthersToggle'
import { CheckPassword } from '../../CheckPassword/CheckPassword'
import {
	handleCheckPassword,
	fetchCreatePassword,
} from '../../redux/slices/CheckPasswordSlice'
import ProfileGetHook from '../../HOOKS/ProfileGetHook'
import { handleGetProfile } from '../../redux/slices/GetProfileSlice'

export default function ChangePassInEdit() {
	const dispatch = useDispatch<AppDispatch>()
	const [password, setPassword] = React.useState<string>('')
	const [againPassword, setAgainPassword] = React.useState<string>('')
	// чтобы не писать точно такой же компонент для нового пароля при том когда человек входит через другой способ входа я решила просто воспользовавшись isHowCreated менять слова и на разные адреса отправлять
	const { getProfile } = ProfileGetHook()
	const isHowCreated = getProfile.isHowCreated

	const onClickPassword = () => {
		const checkPass = CheckPassword({
			password: password,
			againPassword: againPassword,
			dispatch: dispatch,
		})

		if (!checkPass) return

		// если зашли через бузер, то предлагаю ввести новый пароль
		// диспатчу профиль и закрываю окно
		if (isHowCreated) {
			dispatch(fetchCreatePassword({ password }))
			dispatch(handleGetProfile())
			dispatch(setToggleShowChangePasswordInEdit(false))
		} else {
			// это если вошли через обычный вход -> сначала отправляю пароль на то, что он вообще подходит
			// и в редаксе открываю новое окно для ввода нового пароля
			dispatch(handleCheckPassword({ password }))
		}
	}

	return (
		<div className='check-pass-edit container'>
			<div className='check-pass-edit-block container'>
				<span
					className='block-close check-pass-btn-close'
					onClick={() => dispatch(setToggleShowChangePasswordInEdit(false))}
				></span>
				<label className='check-pass-edit_label'>
					Введите {!isHowCreated && 'старый'} пароль
					<input
						type='text'
						className='check-pass-edit_input'
						onChange={e => setPassword(e.target.value)}
					/>
				</label>
				<label className='check-pass-edit_label'>
					Повторите {!isHowCreated && 'старый'} пароль
					<input
						type='text'
						className='check-pass-edit_input'
						onChange={e => setAgainPassword(e.target.value)}
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
