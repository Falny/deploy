import React from 'react'
import './style.scss'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import {
	fetchGetNotification,
	fetchDeleteNotification,
	setNotification,
	fetchUpdateNotification,
	setDeleteNote,
} from '../../redux/slices/NotificationSlice'
import NotificationHook from '../../HOOKS/Notification'

export default React.memo(function Notification() {
	const dispatch = useDispatch<AppDispatch>()
	const { Notification } = NotificationHook()

	React.useEffect(() => {
		dispatch(fetchGetNotification())
	}, [])

	const onClickChangeStatus = (id: string, purpose: string) => {
		dispatch(setNotification({ id, purpose }))
		const token = localStorage.getItem('token')
		if (token) {
			const note = Notification.filter(obj => obj.id_notification === id)[0]
			dispatch(fetchUpdateNotification({ note, purpose }))
		}
	}

	const onClickDeleteNote = (id_note: string) => {
		dispatch(fetchDeleteNotification(id_note))
		dispatch(setDeleteNote(id_note))
	}

	return (
		<div className='notification container'>
			<div className='notification-container'>
				<p className='title'>Уведомления</p>
				<ul className='notification-list'>
					{Notification.length > 0 ? (
						Notification.map(obj => (
							<li className='notification-item' key={obj.id_notification}>
								<span
									className='mini-close note-close'
									onClick={() => onClickDeleteNote(obj.id_notification)}
								></span>
								<p className='notification-item_note'>
									<span className='notification-item_note-name'>
										{obj.fromUser}
									</span>{' '}
									{obj.text}
								</p>
								<div className='notification-item_block'>
									<p className='notification-item_block-time'>
										{obj.time.split(',')[0]}
									</p>

									{obj.text.includes('друзья') ? (
										obj.statusFriend ? (
											<button className='notification-item_block-btn notification-inactive-btn'>
												В друзьях
											</button>
										) : (
											<button
												className='notification-item_block-btn notification-active-btn'
												onClick={() =>
													onClickChangeStatus(obj.id_notification, 'friend')
												}
											>
												Добавить в друзья
											</button>
										)
									) : (
										<button
											className={`notification-item_block-btn ${obj.status ? 'notification-inactive-btn' : 'notification-active-btn'}`}
											onClick={() =>
												onClickChangeStatus(obj.id_notification, 'status')
											}
										>
											{obj.status ? 'Прочитано' : 'Прочитать'}
										</button>
									)}
								</div>
							</li>
						))
					) : (
						<p className='notification_empty-text'>Пока уведомлений нет</p>
					)}
				</ul>
			</div>
		</div>
	)
})
