import React from 'react'
import './style.scss'

import { Cat } from 'lucide-react'
import { House } from 'lucide-react'
import { Bell } from 'lucide-react'
import { ClipboardList } from 'lucide-react'
import { PersonStanding } from 'lucide-react'

import { NavLink } from 'react-router'
import NotificationHook from '../../HOOKS/Notification'
import { fetchGetNotification } from '../../redux/slices/NotificationSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../redux/store'

const isActive = ({ isActive }: { isActive: boolean }) =>
	`sidemain-item_link ${isActive && 'sidemain-li-hover'}`

const listOfSide = [
	{ link: '/tatipati/profile', index: 'profile', name: 'Профиль', icon: Cat },
	{
		link: '/tatipati/notification',
		index: 'note',
		name: 'Уведомления',
		icon: Bell,
	},
	{ link: '/tatipati/home', index: 'home', name: 'Домой', icon: House },
	{
		link: '/tatipati/tasks',
		index: 'task',
		name: 'Задачи',
		icon: ClipboardList,
	},
	{
		link: '/tatipati/friend',
		index: 'friend',
		name: 'Друзья',
		icon: PersonStanding,
	},
]

export default React.memo(function SideMain() {
	const [middleToggleSide, setMiddleToggleSide] = React.useState(false)

	const dispatch = useDispatch<AppDispatch>()
	const { countOfNote } = NotificationHook()

	React.useEffect(() => {
		dispatch(fetchGetNotification())
	}, [])

	const isMobile = window.innerWidth < 600

	return (
		<div
			className='sidemain'
			onClick={() => setMiddleToggleSide(!middleToggleSide)}
		>
			<div
				className={`side container-side ${!isMobile && middleToggleSide && 'middle-side-active'} ${isMobile && 'side-mobile'}`}
			>
				<div className='sidemain-list'>
					<p className='sidemain-item'>Меню</p>
					<ul
						className='sidemain-list_nested-list'
						onClick={e => e.stopPropagation()}
					>
						{listOfSide.map(obj => (
							<li className='sidemain-item_nested-item' key={obj.index}>
								{obj.index === 'note' && countOfNote > 0 && (
									<span className='count-note'>{countOfNote}</span>
								)}
								<NavLink
									to={obj.link}
									className={isActive}
									onClick={() => setMiddleToggleSide(false)}
								>
									<obj.icon className='icon-side sidemain-icon' />
									<p
										className={`sidemain-text ${!isMobile && middleToggleSide ? 'text-active' : 'text-inactive'}`}
									>
										{obj.name}
									</p>
								</NavLink>
							</li>
						))}
					</ul>
					{/* по мере разработке будут добавляться элементы */}
				</div>
			</div>
		</div>
	)
})
