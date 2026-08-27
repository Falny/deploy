import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function useProjectHook() {
	const projectAll = useSelector((state: RootState) => state.project)
	const projectForSend = useSelector(
		(state: RootState) => state.project.project,
	)
	// id проекта выбранного
	const saveIdForOpenProject = useSelector(
		(state: RootState) => state.project.projectOpenId,
	)

	const projectActiveAdmin = useSelector(
		(state: RootState) => state.project.adminOfProject,
	)

	const projectName = useSelector((state: RootState) => state.project.name)
	const projectDescription = useSelector(
		(state: RootState) => state.project.description,
	)

	return {
		projectAll,
		projectForSend,
		saveIdForOpenProject,
		projectActiveAdmin,
		projectName,
		projectDescription,
	}
}
