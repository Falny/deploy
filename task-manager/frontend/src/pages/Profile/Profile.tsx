import React from 'react'
import './style.scss'

import { Settings, LogOut, Cat } from 'lucide-react'

import { handleGetProfile } from '../../redux/slices/GetProfileSlice'

import ProfileGetHook from '../../HOOKS/ProfileGetHook'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'

import { useToggleHook } from '../../HOOKS/ToggleHook'
import { setToggleEditProfile } from '../../redux/slices/OthersToggle'

export default function Profile() {
	const dispatch = useDispatch<AppDispatch>()
	const { getProfile } = ProfileGetHook()
	const { toggleEditProfile } = useToggleHook()

	React.useEffect(() => {
		dispatch(handleGetProfile())
	}, [])

	const onClickLogOut = () => {
		localStorage.removeItem('token')
		window.location.href = '/'
	}

	return (
		<div className='profile container'>
			<div className='profile-data'>
				<div className='block-icons'>
					<Settings
						className='icon profile-icon'
						onClick={() => dispatch(setToggleEditProfile(!toggleEditProfile))}
					/>
					<LogOut
						className='icon profile-icon'
						onClick={() => onClickLogOut()}
					/>
				</div>
				<label className='profile-data_avatar'>
					{getProfile.avatars.length > 0 ? (
						<img
							src={getProfile.avatars[0]}
							alt=''
							className='profile-data_img'
						/>
					) : (
						<Cat className='icon profile-avatar' />
					)}
				</label>
				<div className='profile-data_block'>
					<label className='profile-data_form-label'>
						Логин
						<input
							type='text'
							value={getProfile.login || ''}
							className='profile-data_form-input'
							disabled
							readOnly
						/>
					</label>
					<label className='profile-data_form-label'>
						Имя
						<input
							type='text'
							value={getProfile.name || ''}
							className='profile-data_form-input'
							disabled
						/>
					</label>
					<label className='profile-data_form-label'>
						Пароль
						<input
							type='text'
							value='***********'
							className='profile-data_form-input'
							disabled
						/>
					</label>
				</div>
			</div>
		</div>
	)
}
