import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function useSearchFriendHook() {
	const SearchFriendName = useSelector(
		(state: RootState) => state.searchFriend.name,
	)
	const SearchFriendArrayFromUsers = useSelector(
		(state: RootState) => state.searchFriend.users,
	)
	return { SearchFriendName, SearchFriendArrayFromUsers }
}
