import React from 'react'
import './style.scss'

import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'

import type { AppDispatch } from '../../redux/store'
import { setToggleWarningMessage } from '../../redux/slices/OthersToggle'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '../../redux/slices/LoginSlice'

export default function Login() {
	const [toggleSvg, setToggleSvg] = React.useState<boolean>(false)

	const [login, setLogin] = React.useState<string>()
	const [password, setPassword] = React.useState<string>()
	const dispatch = useDispatch<AppDispatch>()

	const handleLoginRequest = async () => {
		if (!login) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: { text: 'Введите логин', status: 'ERROR' },
				}),
			)

			return
		}

		if (!password) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: { text: 'Введите пароль', status: 'ERROR' },
				}),
			)
			return
		}

		setPassword(password.trim())
		localStorage.setItem('howIsLogin', 'false')
		dispatch(fetchLogin({ login, password }))
	}

	const onClickAuth = () => {
		// каким образом произошел вход? либо обычно, либо через браузеры || true - через браузеры; false - через обычный вход
		localStorage.setItem('howIsLogin', 'true')

		const client_id = '0a4df42f456a4e7a9b361cae0a96dfd1'
		const redirect_uri = encodeURIComponent('tatipati')

		const YAuth = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`

		window.location.href = YAuth
	}

	return (
		<div className='common-form-log login'>
			<form action='POST' className='common-form-form login-form'>
				<div className='common-form-block login-form_block'>
					<input
						type='text'
						className='common-form-input login-form-input'
						placeholder='Логин'
						onChange={e => setLogin(e.target.value)}
					/>
				</div>
				<div className='common-form-block login-form_block'>
					<input
						type={toggleSvg ? 'password' : 'text'}
						className='common-form-input login-form-input'
						placeholder='Пароль'
						onChange={e => setPassword(e.target.value)}
					/>
					<div
						className='common-form_img-block'
						onClick={() => setToggleSvg(!toggleSvg)}
					>
						{toggleSvg ? (
							<Eye className='common-form_img' />
						) : (
							<EyeOff className='common-form_img' />
						)}
					</div>
				</div>
			</form>
			<button className='common-form-btn' onClick={() => handleLoginRequest()}>
				Войти
			</button>
			<div className='block-auth'>
				<button className='logout logout-yandex' onClick={() => onClickAuth()}>
					<span className='icon-yandex'>Я</span>
				</button>
			</div>
		</div>
	)
}
