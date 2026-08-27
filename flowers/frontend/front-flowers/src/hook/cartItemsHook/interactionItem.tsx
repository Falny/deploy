import { FetchDelete, FetchUpdate } from '../../redux/slices/cartSlice'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { setCount } from '../../redux/slices/cartSlice'

export const InteractionItem = () => {
	const dispatch = useDispatch<AppDispatch>()

	const deleteItem = async (id: string) => {
		await dispatch(FetchDelete(id))
	}

	const updateItem = async ({
		id,
		type,
		count,
	}: {
		id: string
		type: string
		count: number
	}) => {
		if (type === '-' && count > 1) {
			count -= 1
			dispatch(setCount({ id, count }))
			await dispatch(FetchUpdate({ id, count }))
		}
		if (type === '+') {
			count += 1
			dispatch(setCount({ id, count }))
			await dispatch(FetchUpdate({ id, count }))
		}
	}

	return { deleteItem, updateItem }
}
