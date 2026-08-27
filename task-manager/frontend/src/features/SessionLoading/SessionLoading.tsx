import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setIsAuth } from '../../redux/slices/OthersToggle'
import { fetchGetAuthorizedYandex } from '../../redux/slices/LoginSlice'

export default function SessionLoading() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	React.useEffect(() => {
		const howIsLogin = localStorage.getItem('howIsLogin')

		if (howIsLogin === 'false') {
			if (token) {
				dispatch(setIsAuth(true))
				localStorage.removeItem('howIsLogin')
			}
		}

		const fetch = async () => {
			try {
				const url = new URLSearchParams(window.location.search)
				const code = url.get('code')
				const error = url.get('error')

				if (code) {
					const response = await dispatch(
						fetchGetAuthorizedYandex(code),
					).unwrap()
					if (response['success']) {
						window.localStorage.setItem('token', response['token'])
					}
					dispatch(setIsAuth(true))
				}
				localStorage.removeItem('howIsLogin')
				if (error) {
					navigate('/')
				}
			} catch (error) {
				navigate('/')
			}
		}

		// каким образом произошел вход? либо обычно, либо через браузеры || true - через браузеры; false - через обычный вход
		if (howIsLogin === 'true') {
			fetch()
		}
	}, [])

	if (!token) {
		return (
			<div
				className=''
				style={{
					position: 'fixed',
					inset: '0',
					zIndex: '1000',
					cursor: 'wait',
				}}
			></div>
		)
	}

	return <Outlet />
}
