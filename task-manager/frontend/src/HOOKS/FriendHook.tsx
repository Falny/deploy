import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function FriendHook() {
	const friends = useSelector((state: RootState) => state.friend.friend)

	return friends
}
