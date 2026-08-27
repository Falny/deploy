import { setToggleWarningMessage } from '../redux/slices/OthersToggle'
import type { Dispatch } from '@reduxjs/toolkit'

type CheckPasswordProps = {
	password: string
	againPassword?: string
	dispatch: Dispatch
}

export const CheckPassword = ({
	password,
	againPassword,
	dispatch,
}: CheckPasswordProps) => {
	if (!password) {
		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Введите пароль',
					status: 'ERROR',
				},
			}),
		)
		return false
	}

	if (password?.length < 5 || password?.length > 15) {
		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Короткий или длинный пароль',
					status: 'ERROR',
				},
			}),
		)
		return false
	}

	if (!/[1-9]/.test(password)) {
		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Должна быть хотя бы одна цифра',
					status: 'ERROR',
				},
			}),
		)
		return false
	}

	if (!/[A-Z]/.test(password)) {
		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Должна быть хотя бы одна заглавная буква',
					status: 'ERROR',
				},
			}),
		)
		return false
	}

	if (!/[!@$%&?()\-+=#,._]/.test(password)) {
		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Должен быть хотя бы один !,@,$,%,&,?,(,),-,+,=,#,,,.,_ символ',
					status: 'ERROR',
				},
			}),
		)
		return false
	}

	if (password !== againPassword) {
		dispatch(
			setToggleWarningMessage({
				toggleWarningMessage: {
					text: 'Пароли должны совпадать',
					status: 'ERROR',
				},
			}),
		)
		return false
	}
	return true
}
