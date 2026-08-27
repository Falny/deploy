import React from 'react'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import type { AppDispatch } from '../../redux/store'
import {
	setToggleWarningMessage,
	setToggleCheckLogin,
} from '../../redux/slices/OthersToggle'
import { useDispatch } from 'react-redux'
import { CheckPassword } from '../../CheckPassword/CheckPassword'

import { useToggleHook } from '../../HOOKS/ToggleHook'

import {
	setLogin,
	setPassword,
	setPasswordAgain,
	handleCheckRegistrationLogin,
	handleRegistration,
} from '../../redux/slices/RegistrationSlice'

import RegistrationHook from '../../HOOKS/RegistrationHook'

export default function Registration() {
	const [toggleSvg, setToggleSvg] = React.useState<boolean[]>([false, false])

	const [focusLogin, setFocusLogin] = React.useState(false)
	const { toggleCheckLogin } = useToggleHook()

	const dispatch = useDispatch<AppDispatch>()
	const { registrationLogin, registration } = RegistrationHook()

	const changeToggle = (num: number) => {
		setToggleSvg(prev => prev.map((el, i) => (i === num ? !el : el)))
	}

	const handlePassword = async () => {
		// сделала констрцкцию ниже только потому что при смене логина и сразу нажатии кнопки отправить вылезала ошибка потому что шла проверка на логин -> так я решила здесь сразу ловить ответ и менять переменную
		try {
			const resultReq = await dispatch(
				handleCheckRegistrationLogin(registrationLogin),
			).unwrap()
			if (resultReq) {
				dispatch(setToggleCheckLogin(true))
			}
		} catch (error) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Произошла непредвиденная ошибка',
						status: 'ERROR',
					},
				}),
			)
			return
		}

		if (!toggleCheckLogin) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Такой пользователь уже существует',
						status: 'ERROR',
					},
				}),
			)
			return
		}

		const resultCheckPass = CheckPassword({
			password: registration.password,
			againPassword: registration.againPassword,
			dispatch: dispatch,
		})

		if (!resultCheckPass) {
			return
		}

		if (!registration.login) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: { text: 'Введите логин', status: 'ERROR' },
				}),
			)
			return
		}

		// отправка данных на сервер
		dispatch(
			handleRegistration({
				regist: {
					login: registrationLogin.trim(),
					password: registration.password.trim(),
					againPassword: registration.againPassword.trim(),
				},
			}),
		)

		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Данные успешно отправлены',
					status: 'SUCCESS',
				},
			}),
		)
		dispatch(setToggleCheckLogin(true))
	}

	//проверка отправки логина на проверку на наличие такого логина
	React.useEffect(() => {
		if (registrationLogin.length != 0 && !focusLogin) {
			dispatch(handleCheckRegistrationLogin(registrationLogin))
		}

		return
	}, [focusLogin])

	// отслеживаю клик пользователя для запроса на бек
	const followClickUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const target = e.target as HTMLElement
		if (!target.classList.contains('login')) {
			setFocusLogin(false)
		}
	}

	return (
		<div className='common-form-log' onClick={e => followClickUser(e)}>
			<form action='POST' className='common-form-form'>
				<div className='common-form-block login-form_block'>
					<input
						type='text'
						className='common-form-input login-form-input login'
						placeholder='Логин'
						onChange={e => dispatch(setLogin(e.target.value))}
						onFocus={() => setFocusLogin(true)}
						value={registrationLogin}
					/>
				</div>
				<div className='common-form-block login-form_block'>
					<input
						type={toggleSvg[0] ? 'password' : 'text'}
						className='common-form-input login-form-input'
						placeholder='Пароль'
						onChange={e => dispatch(setPassword(e.target.value))}
						value={registration.password}
					/>
					<div
						className='common-form_img-block'
						onClick={() => changeToggle(0)}
					>
						{toggleSvg[0] ? (
							<Eye className='common-form_img' />
						) : (
							<EyeOff className='common-form_img' />
						)}
					</div>
				</div>
				<div className='common-form-block login-form_block'>
					<input
						type={toggleSvg[1] ? 'password' : 'text'}
						className='common-form-input login-form-input'
						placeholder='Повторите пароль'
						onChange={e => dispatch(setPasswordAgain(e.target.value))}
						value={registration.againPassword}
					/>
					<div
						className='common-form_img-block'
						onClick={() => changeToggle(1)}
					>
						{toggleSvg[1] ? (
							<Eye className='common-form_img' />
						) : (
							<EyeOff className='common-form_img' />
						)}
					</div>
				</div>
			</form>
			<button className='common-form-btn' onClick={() => handlePassword()}>
				Зарегистрироваться
			</button>
		</div>
	)
}
