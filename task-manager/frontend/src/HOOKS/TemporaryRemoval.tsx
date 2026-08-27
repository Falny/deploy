import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function TemporaryRemoval() {
	const TaskDelete = useSelector((state: RootState) => state.removeTask.task)

	return { TaskDelete }
}
