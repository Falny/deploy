import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function useStatusHook() {
	const status = useSelector((state: RootState) => state.status.status)
	const statusAdd = useSelector((state: RootState) => state.status.statusAdd) // строка со статусом для добавления

	const color = useSelector((state: RootState) => state.status.color)

	return { status, statusAdd, color }
}
