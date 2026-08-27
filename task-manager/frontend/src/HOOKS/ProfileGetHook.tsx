import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function ProfileGetHook() {
	const getProfile = useSelector((state: RootState) => state.profile)

	const getProfileFriend = useSelector(
		(state: RootState) => state.profile.friends,
	)

	const getProfileLogin = useSelector((state: RootState) => state.profile.login)

	return { getProfile, getProfileFriend, getProfileLogin }
}
