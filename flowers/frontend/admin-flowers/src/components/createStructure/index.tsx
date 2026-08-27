import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import {
	FetchStructureDelete,
	FetchStructureGet,
	FetchStructurePatch,
	FetchStructurePost,
} from '../../redux/slice/structureSlice'
import { CreateCommon } from '../createCommon'

export const CreateStructure = () => {
	const [value, setValue] = React.useState<string>('')
	const [success, setSuccess] = React.useState(false)

	const [getId, setGetId] = React.useState('')
	const [changeInput, setChangeInput] = React.useState<string>('')

	const structure = useSelector((state: RootState) => state.structure.structure)
	const dispatch = useDispatch<AppDispatch>()

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (success) {
			dispatch(FetchStructurePost(value))
			setValue('')
		}
	}

	const handleCheck = () => {
		const checkCategory = structure.some(el =>
			el.structure.toString().toLowerCase().includes(value.toLowerCase()),
		)

		if (!checkCategory) {
			setSuccess(true)
		} else {
			setSuccess(false)
			alert('такая категория уже существует')
		}
	}

	const handleDeleteItem = (id: string) => {
		dispatch(FetchStructureDelete(id))
	}

	const handleChageField = (id: string) => {
		setGetId(prev => (prev.includes(id) ? '' : id))

		if (changeInput) {
			dispatch(FetchStructurePatch({ id, structure: changeInput }))
			setChangeInput('')
		}
	}

	React.useEffect(() => {
		dispatch(FetchStructureGet())
		setSuccess(false)
	}, [success, dispatch])

	return (
		<>
			<CreateCommon
				title={'Создание состава'}
				field={'Состав'}
				value={value}
				list={structure}
				name={'structure'}
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
