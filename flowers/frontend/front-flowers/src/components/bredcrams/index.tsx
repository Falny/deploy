import { useSelector } from 'react-redux'
import './style.scss'
import { Link, useLocation } from 'react-router-dom'
import type { RootState } from '../../redux/store'

export const Breadcrumbs = () => {
	const location = useLocation()
	const pathname = location.pathname.split('/')
	const cards = useSelector((state: RootState) => state.cards.cards)

	const displayPath = (path: string) => {
		if (path === 'catalog') {
			return 'каталог'
		} else if (path === 'delivery-and-pay') {
			return 'доставка и оплата'
		} else if (path === 'about') {
			return 'о нас'
		} else if (path === 'contact') {
			return 'Контакты'
		} else if (path === 'faq') {
			return 'faq'
		} else if (path === 'cart') {
			return 'Оформление заказа'
		} else if (path === 'search') {
			return 'Поиск'
		}

		const card = cards.find(el => el.id === path)
		return card ? card.name : path
	}

	return (
		<div className='breadcrumbs'>
			<Link to='/' className='bread-link'>
				главная
			</Link>
			{pathname.map((path, index) => {
				const isLast = index === pathname.length - 1
				const onPath = `/${pathname.slice(0, pathname.length - 1).join('')}/`
				return !isLast ? (
					<div className='pathname' key={index}>
						<Link to={onPath} className='bread-link'>
							{displayPath(path)} {'/'}
						</Link>
					</div>
				) : (
					<p key={index}>{displayPath(path)}</p>
				)
			})}
		</div>
	)
}
