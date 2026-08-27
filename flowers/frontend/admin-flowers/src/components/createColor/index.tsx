import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import {
	FetchColorDelete,
	FetchColorGet,
	FetchColorPatch,
	FetchColorPost,
} from '../../redux/slice/colorSlice'
import { CreateCommon } from '../createCommon'

export const CreateColor = () => {
	const [value, setValue] = React.useState<string>('')
	const [success, setSuccess] = React.useState(false)

	const [getId, setGetId] = React.useState('')
	const [changeInput, setChangeInput] = React.useState<string>('')

	const colors = useSelector((state: RootState) => state.color.color)
	const dispatch = useDispatch<AppDispatch>()

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (success) {
			dispatch(FetchColorPost(value))
			setValue('')
		}
	}

	const handleCheck = () => {
		const checkColor = colors.some(el =>
			el.color.toString().toLowerCase().includes(value.toLowerCase()),
		)

		if (!checkColor) {
			setSuccess(true)
		} else {
			setSuccess(false)
			alert('такая категория уже существует')
		}
	}

	const handleDeleteItem = (id: string) => {
		dispatch(FetchColorDelete(id))
	}

	const handleChageField = (id: string) => {
		setGetId(prev => (prev.includes(id) ? '' : id))

		if (changeInput) {
			dispatch(FetchColorPatch({ id, color: changeInput }))
			setChangeInput('')
		}
	}

	React.useEffect(() => {
		dispatch(FetchColorGet())
		setSuccess(false)
	}, [success, dispatch])

	return (
		<>
			<CreateCommon
				title={'Создание цветов'}
				field={'Цвет'}
				value={value}
				list={colors}
				name={'color'}
				newName={changeInput}
				setValue={setValue}
				handleCheck={handleCheck}
				getId={getId}
				setChangeInput={setChangeInput}
				handleChageField={handleChageField}
				handleDeleteItem={handleDeleteItem}
				handleSubmitForm={handleSubmitForm}
			/>
		</>
	)
}
