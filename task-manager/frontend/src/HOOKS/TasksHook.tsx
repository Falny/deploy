import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export const useTasksHook = () => {
	const TasksFields = useSelector((state: RootState) => state.task)
	const TasksHook = useSelector((state: RootState) => state.task.task)
	const idTask = useSelector((state: RootState) => state.task.id_task)
	return { TasksFields, TasksHook, idTask }
}
