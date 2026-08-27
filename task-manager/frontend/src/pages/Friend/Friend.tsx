import React from 'react'
import './style.scss'
import { Search } from 'lucide-react'
import {
	fetchSearchFriend,
	setSearchName,
	setClearFriend,
} from '../../redux/slices/SearchFriendSlice'

import { Check, Cat, X } from 'lucide-react'

import {
	setToggleWarningMessage,
	setToggleShowOpenNoteDelete,
	setWhatChangeTaskOrProject,
	setDeleteFriendToggle,
} from '../../redux/slices/OthersToggle'

import useSearchFriendHook from '../../HOOKS/SearchFriendHook'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'

import { fetchNotification } from '../../redux/slices/NotificationSlice'

import {
	fetchGetFriend,
	fetchDeleteFriend,
	setDeleteFriend,
} from '../../redux/slices/FriendSlice'
import FriendHook from '../../HOOKS/FriendHook'
import { useToggleHook } from '../../HOOKS/ToggleHook'

export default function Friend() {
	const [loginFriend, setLoginFriend] = React.useState('')

	const dispatch = useDispatch<AppDispatch>()
	const { SearchFriendName, SearchFriendArrayFromUsers } = useSearchFriendHook()
	const { deleteFriend } = useToggleHook()
	const friends = FriendHook()

	React.useEffect(() => {
		dispatch(fetchGetFriend())
		dispatch(setSearchName(''))
		dispatch(setClearFriend())
	}, [])

	const onClickCommonSearch = () => {
		if (SearchFriendName.length === 0) {
			dispatch(
				setToggleWarningMessage({
					toggleWarningMessage: {
						text: 'Введите имя',
						status: 'ERROR',
					},
				}),
			)
			return false
		}
		return true
	}

	const onClickEnter = (e: React.KeyboardEvent) => {
		if (onClickCommonSearch()) {
			if (e.code === 'Enter') {
				dispatch(fetchSearchFriend({ name: SearchFriendName.trim() }))
			}
		}
	}

	const onClickSendSearch = () => {
		if (onClickCommonSearch()) {
			dispatch(fetchSearchFriend({ name: SearchFriendName.trim() }))
		}
	}

	const onClickSuccessNotification = (loginAnotherUser: string) => {
		dispatch(
			fetchNotification({
				loginAnotherUser: loginAnotherUser,
				text: ' хочет добавить вас в друзья',
				time: new Date().toLocaleString(),
			}),
		)
	}

	const onClickClearSearch = () => {
		dispatch(setClearFriend())
		dispatch(setSearchName(''))
	}

	const onClickDeleteFriend = (login: string) => {
		dispatch(setToggleShowOpenNoteDelete(true))
		dispatch(setWhatChangeTaskOrProject('F'))
		setLoginFriend(login)
	}

	React.useEffect(() => {
		if (deleteFriend) {
			dispatch(fetchDeleteFriend({ login: loginFriend }))
			dispatch(setDeleteFriend(loginFriend))
			dispatch(setDeleteFriendToggle(false))
		}
	}, [deleteFriend])

	return (
		<div className='friend container'>
			<div className='friend-block'>
				<div className='friend-search'>
					<label className='friend-search_label'>
						<div className='search-block'>
							<Search className='icon friend-icon_search' />
							<input
								type='text'
								value={SearchFriendName}
								onChange={e => dispatch(setSearchName(e.target.value))}
								className='friend-search_input'
								placeholder='Введите имя..'
								onKeyDown={e => onClickEnter(e)}
							/>
							<span
								className='mini-close search-clear'
								onClick={() => onClickClearSearch()}
							></span>
						</div>
						<button
							className='friend-search_btn'
							onClick={() => onClickSendSearch()}
						>
							Поиск
						</button>
					</label>
				</div>
				<ul className='friend-list'>
					{SearchFriendArrayFromUsers &&
					SearchFriendArrayFromUsers.length > 0 ? (
						SearchFriendArrayFromUsers.map(obj => (
							<li className='friend-item' key={obj.login}>
								<div className='friend-find_block_item'>
									{obj.avatars ? (
										<img src={obj.avatars} alt='' className='friend-find_img' />
									) : (
										<Cat className='icon' />
									)}
									<p className='friend-find_item_name'>{obj.login}</p>
								</div>
								<Check
									className='icon friend-find_icon'
									onClick={() => onClickSuccessNotification(obj.login)}
								/>
							</li>
						))
					) : SearchFriendName.trim().length === 0 ? (
						''
					) : (
						<p className='friend-find_empty'>Никого не нашлось</p>
					)}
				</ul>
				<ul className='friend-list'>
					{friends.length > 0 ? (
						friends.map(obj => (
							<li className='friend-item' key={obj.login}>
								<div className='friend-find_block_item'>
									{obj.avatars ? (
										<img src={obj.avatars} alt='' className='friend-find_img' />
									) : (
										<Cat className='icon' />
									)}
									<p className='friend-find_item_name'>{obj.login}</p>
								</div>
								<div className='block-btns'>
									<button className='btn-send friend-btn'>
										{obj.statusFriend && 'В друзьях'}
									</button>
									<button
										className='btn-send friend-btn friend-delete'
										onClick={() => onClickDeleteFriend(obj.login)}
									>
										<X className='icon-delete' />
									</button>
								</div>
							</li>
						))
					) : (
						<p className='friend-find_empty'>Здесь пока никого нет</p>
					)}
				</ul>
			</div>
		</div>
	)
}
