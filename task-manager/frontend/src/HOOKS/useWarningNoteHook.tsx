import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function useWarningNoteHook() {
	const warnings = useSelector((state: RootState) => state.toggle.warnings)

	return { warnings }
}
