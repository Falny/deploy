import React from 'react'
import './style.scss'
import Login from '../../features/Login-Registr-Forgot/Login'
import Registration from '../../features/Login-Registr-Forgot/Registration'
import ForgotPassword from '../../features/Login-Registr-Forgot/ForgotPassword'
import Title from '../../shared/Title/Title'
import Warning from '../../shared/Warning/Warning'
import type { AppDispatch } from '../../redux/store'
import { setDeleteWarning } from '../../redux/slices/OthersToggle'
import { useDispatch } from 'react-redux'

import useWarningNoteHook from '../../HOOKS/useWarningNoteHook'

type toggleFormValue = 'LOGIN' | 'REGISTRATION' | 'FORGOTPASSWORD'

export default function InitPage() {
	const [toggleForms, setToggleForms] = React.useState<toggleFormValue>('LOGIN')

	const dispatch = useDispatch<AppDispatch>()

	const { warnings } = useWarningNoteHook()

	const Form = {
		LOGIN: {
			component: <Login />,
			text: {
				first: 'Еще нет аккаунта?',
				second: 'Забыли пароль?',
			},
		},

		REGISTRATION: {
			component: <Registration />,
			text: {
				first: 'Войти',
				second: 'Забыли пароль?',
			},
		},

		FORGOTPASSWORD: {
			component: <ForgotPassword />,
			text: {
				first: 'Еще нет аккаунта?',
				second: 'Войти',
			},
		},
	}

	const currentForm = Form[toggleForms].component
	const { first, second } = Form[toggleForms].text

	React.useEffect(() => {
		if (warnings.length > 0) {
			const timer = warnings.map(note =>
				setTimeout(() => {
					dispatch(setDeleteWarning(note.id))
				}, 4000),
			)

			return () => timer.forEach(time => clearTimeout(time))
		}
	}, [warnings])

	const clickChangeToggleFirst = () => {
		toggleForms === 'LOGIN'
			? setToggleForms('REGISTRATION')
			: toggleForms === 'FORGOTPASSWORD'
				? setToggleForms('REGISTRATION')
				: setToggleForms('LOGIN')
	}
	const clickChangeToggleSecond = () => {
		toggleForms === 'LOGIN'
			? setToggleForms('FORGOTPASSWORD')
			: toggleForms === 'REGISTRATION'
				? setToggleForms('FORGOTPASSWORD')
				: setToggleForms('LOGIN')
	}

	return (
		<div className='init-page'>
			<span className='init-page_circle-1'></span>
			<span className='init-page_circle-2'></span>
			<span className='init-page_circle-3'></span>
			<span className='init-page_circle-4'></span>
			<div className='init-page_title'>
				<Title />
			</div>
			<div className='init-page_block'>
				{currentForm}
				<div className='init-page_block-link'>
					<p
						className='init-page_link init-page_have-account'
						onClick={() => clickChangeToggleFirst()}
					>
						{first}
					</p>
					<p
						className='init-page_link init-page_forgot-pass'
						onClick={() => clickChangeToggleSecond()}
					>
						{second}
					</p>
				</div>
			</div>
			<div className='warnings-pull'>
				{warnings.map(note => (
					<Warning
						text={note.toggleWarningMessage?.text}
						status={note.toggleWarningMessage?.status}
					/>
				))}
			</div>
		</div>
	)
}
