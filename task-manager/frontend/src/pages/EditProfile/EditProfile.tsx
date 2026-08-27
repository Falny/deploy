import './style.scss'

import { Cat } from 'lucide-react'

import ProfileGetHook from '../../HOOKS/ProfileGetHook'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { handleUpdateProfile } from '../../redux/slices/GetProfileSlice'

import { useToggleHook } from '../../HOOKS/ToggleHook'
import {
	setToggleEditProfile,
	setToggleShowNoteCheckPass,
	setToggleShowChangePasswordInEdit,
} from '../../redux/slices/OthersToggle'

import { CheckPassword } from '../../CheckPassword/CheckPassword'

import {
	setLogin,
	setAvatar,
	setPassword,
	setName,
} from '../../redux/slices/GetProfileSlice'

import { base64 } from '../../convert/EnDecoderBase64'

export default function EditProfile() {
	const dispatch = useDispatch<AppDispatch>()
	const { getProfile } = ProfileGetHook()

	const { toggleEditProfile, toggleCheckPasswordToChangeIt } = useToggleHook()

	const onClickLabelToChangePassword = () => {
		if (!toggleCheckPasswordToChangeIt) {
			dispatch(setToggleShowNoteCheckPass(true))
		}
	}

	const handleSendDataUpdate = () => {
		const token = localStorage.getItem('token')
		if (toggleCheckPasswordToChangeIt && getProfile.password) {
			const resultCheck = CheckPassword({
				password: getProfile.password,
				dispatch: dispatch,
			})

			if (!resultCheck) {
				return
			}
		}

		if (token) {
			dispatch(
				handleUpdateProfile({
					profile: {
						avatars: getProfile.avatars,
						login: getProfile.login,
						name: getProfile.name,
						token: token,
						password: toggleCheckPasswordToChangeIt ? getProfile.password : '',
						statuses: getProfile.statuses,
						friends: getProfile.friends,
						isHowCreated: getProfile.isHowCreated,
					},
				}),
			)
		}
	}

	const handleImg = async (img: File | undefined) => {
		try {
			if (!img) return
			const convertImgToStr = await base64(img)
			if (typeof convertImgToStr === 'string') {
				dispatch(setAvatar(convertImgToStr))
			} else {
				console.log(convertImgToStr)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='edit-profile'>
			<div className='edit-profile_block container'>
				<div
					className='block-close'
					onClick={() => dispatch(setToggleEditProfile(!toggleEditProfile))}
				></div>
				<label className='edit-profile_label-avatar'>
					<input
						type='file'
						className='edit-profile_avatar'
						onChange={e => handleImg(e.target.files?.[0])}
					/>

					{getProfile.avatars?.length > 0 ? (
						<img
							src={getProfile.avatars[0]}
							alt=''
							className='edit-profile_img'
						/>
					) : (
						<Cat className='icon edit-profile_avatar' />
					)}
				</label>
				<div className='edit-profile-field'>
					<label className='edit-profile_form-label'>
						Логин
						<input
							type='text'
							value={getProfile.login}
							className='edit-profile_form-input'
							onChange={e => dispatch(setLogin(e.target.value))}
							disabled
						/>
					</label>
					<label className='edit-profile_form-label'>
						Имя
						<input
							type='text'
							value={getProfile.name}
							className='edit-profile_form-input'
							onChange={e => dispatch(setName(e.target.value))}
						/>
						<span
							className='close edit-profile_label-close'
							onClick={() => dispatch(setName(''))}
						></span>
					</label>

					{getProfile.isHowCreated ? (
						<button
							className='btn-send edit-btn'
							onClick={() => dispatch(setToggleShowChangePasswordInEdit(true))}
						>
							Создайте пароль
						</button>
					) : (
						<label
							className='edit-profile_form-label'
							onClick={() => onClickLabelToChangePassword()}
						>
							Пароль
							<input
								type='text'
								value={getProfile.password}
								className='edit-profile_form-input'
								onChange={e =>
									toggleCheckPasswordToChangeIt &&
									dispatch(setPassword(e.target.value))
								}
							/>
							<span
								className='close edit-profile_label-close'
								onClick={() =>
									toggleCheckPasswordToChangeIt && dispatch(setPassword(''))
								}
							></span>
						</label>
					)}
				</div>
				<button
					className='btn-send edit-profile_btn'
					onClick={() => handleSendDataUpdate()}
				>
					Отправить
				</button>
			</div>
		</div>
	)
}
