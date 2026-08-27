import './style.scss'

import Logo from '../../assets/header/logo.svg'
import Inst from '../../assets/infoOrder/inst.svg'
import Viber from '../../assets/infoOrder/viber.svg'
import Call from '../../assets/common/call.svg'
import { Link, useLocation } from 'react-router-dom'
import type { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { Scroll } from '../../hook/scrollToTop'

const links = [
	{
		name: 'доставка и оплата',
		path: '/delivery-and-pay',
	},
	{
		name: 'о нас',
		path: '/about',
	},
	{
		name: 'контакты',
		path: '/contact',
	},
	{
		name: 'FAQ',
		path: '/faq',
	},
]

export const Footer = () => {
	const categoryArray = useSelector((state: RootState) => state.sorts.category)
	const category = categoryArray.map(el => el.category).flat()

	const location = useLocation()
	const { scrollToTop } = Scroll()

	const isFooter =
		location.pathname === '/error-pay' ||
		location.pathname === '/delivery-and-pay'

	return (
		<>
			<div className={`footer ${!isFooter && 'footer-margin'}`}>
				<div className='container'>
					<div className='footer-container'>
						<div className='footer_block'>
							<Link to='/'>
								<img src={Logo} alt='logo' className='bl-1_logo' />
							</Link>
							<div className='bl_common'>
								<h4 className='bl_common-title'>реквизиты</h4>
								<div className='bl-1_text'>пупупупу...</div>
							</div>
						</div>
						<div className='footer_block'>
							<h4 className='bl_common-title'>Каталог</h4>
							<div className='bl-catalog'>
								{category.map((el, index) => (
									<Link
										to='/catalog'
										key={index}
										className='bl_catalog-item'
										onClick={() => scrollToTop()}
									>
										{el}
									</Link>
								))}
							</div>
						</div>
						<div className='footer_block'>
							{links.map((links, index) => (
								<Link key={index} to={links.path} className='bl_common-title'>
									{links.name}
								</Link>
							))}
						</div>
						<div className='footer_block'>
							<div className='bl-4_info'>
								<p className='bl_common-title bl_info_title'>
									zakaz@loverflower.by
								</p>
								<p className='bl_info-text'>
									Доставка 24/7 по договоренности с оператором
								</p>
							</div>
							<div className='bl-4_info'>
								<p className='bl_common-title bl_info_title'>
									ул. Тимирязева 67
								</p>
								<p className='bl_info-text'>
									10:00 до 21:00 <br /> без выходных
								</p>
							</div>
							<div className='bl-4_info'>
								<p className='bl_common-title bl_info_title'>
									+375 (29) 113-69-69
								</p>
								<p className='bl_info-text'>прием звонков круглосуточно</p>
							</div>
							<div className='bl-4_info'>
								<div className='bl-icons'>
									<img src={Inst} alt='icons' className='icons' />
									<img src={Viber} alt='icons' className='icons' />
									<img src={Call} alt='incns' className='icons' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
