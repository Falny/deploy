import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	FetchCategoryDelete,
	FetchCategoryGet,
	FetchCategoryPatch,
	FetchCategoryPost,
} from '../../redux/slice/categorySlice'
import type { AppDispatch, RootState } from '../../redux/store'
import { CreateCommon } from '../createCommon'

export const CreateCategory = () => {
	const [value, setValue] = React.useState<string>('')
	const [success, setSuccess] = React.useState(false)

	const [getId, setGetId] = React.useState('')
	const [changeInput, setChangeInput] = React.useState<string>('')

	const categories = useSelector((state: RootState) => state.category.category)
	const dispatch = useDispatch<AppDispatch>()

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (success) {
			dispatch(FetchCategoryPost(value))
			setValue('')
		}
	}

	const handleCheckCategory = () => {
		const checkCategory = categories.some(el =>
			el.category.toString().toLowerCase().includes(value.toLowerCase()),
		)

		if (!checkCategory) {
			setSuccess(true)
		} else {
			setSuccess(false)
			alert('такая категория уже существует')
		}
	}

	const handleDeleteItem = (id: string) => {
		dispatch(FetchCategoryDelete(id))
	}

	const handleChageField = (id: string) => {
		setGetId(prev => (prev.includes(id) ? '' : id))

		if (changeInput) {
			dispatch(FetchCategoryPatch({ id, category: changeInput }))
			setChangeInput('')
		}
	}

	React.useEffect(() => {
		dispatch(FetchCategoryGet())
		setSuccess(false)
	}, [success, dispatch])

	return (
		<>
			<CreateCommon
				title={'Создание каталога'}
				field={'каталог'}
				value={value}
				list={categories}
				name={'category'}
				newName={changeInput}
				setValue={setValue}
				handleCheck={handleCheckCategory}
				getId={getId}
				setChangeInput={setChangeInput}
				handleChageField={handleChageField}
				handleDeleteItem={handleDeleteItem}
				handleSubmitForm={handleSubmitForm}
			/>
		</>
	)
}
