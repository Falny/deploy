import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function useDashboard() {
	const statistics = useSelector(
		(state: RootState) => state.dashboard.statistics,
	)
	const countCreateTask = useSelector(
		(state: RootState) => state.dashboard.countCreateTask,
	)
	const countDeleteTask = useSelector(
		(state: RootState) => state.dashboard.countDeleteTask,
	)
	const countExpiredTask = useSelector(
		(state: RootState) => state.dashboard.countExpiredTask,
	)
	const countAddFriend = useSelector(
		(state: RootState) => state.dashboard.countAddFriend,
	)
	const countCreateProject = useSelector(
		(state: RootState) => state.dashboard.countCreateProject,
	)
	const countDeleteProject = useSelector(
		(state: RootState) => state.dashboard.countDeleteProject,
	)
	const countTaskWereYouAdd = useSelector(
		(state: RootState) => state.dashboard.countTaskWereYouAdd,
	)
	const countProjectWereYouAdd = useSelector(
		(state: RootState) => state.dashboard.countProjectWereYouAdd,
	)

	return {
		statistics,
		countCreateTask,
		countDeleteTask,
		countExpiredTask,
		countAddFriend,
		countCreateProject,
		countDeleteProject,
		countTaskWereYouAdd,
		countProjectWereYouAdd,
	}
}
