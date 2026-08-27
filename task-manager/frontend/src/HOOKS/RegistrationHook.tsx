import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function RegistrationHook() {
	const registrationLogin = useSelector(
		(state: RootState) => state.registration.login,
	)
	const registration = useSelector((state: RootState) => state.registration)

	return { registrationLogin, registration }
}
