import React from 'react'
import './style.scss'
import { NavLink, type NavLinkRenderProps } from 'react-router-dom'
import { SearchHook } from '../../../hook/headerHook/searchHook'

import Inst from '../../../assets/infoOrder/inst.svg'
import Viber from '../../../assets/infoOrder/viber.svg'
import UsuallyCall from '../../../assets/infoOrder/usually-call.svg'

type ToggleProp = {
	logo: string
	nav: { name: string; path: string }[]
	search: string
	classNav: (props: NavLinkRenderProps) => string
}

export const MenuToggle = ({ logo, nav, search, classNav }: ToggleProp) => {
	const [toggle, setToggle] = React.useState(false)
	const { onChangeInput, value } = SearchHook()

	React.useEffect(() => {
		if (toggle) {
			document.body.style.overflowY = 'hidden'
		} else {
			document.body.style.overflowY = 'scroll'
		}
	}, [toggle])

	return (
		<>
			<div className='header-container'>
				<div
					className={!toggle ? 'header-toggle' : ''}
					onClick={() => setToggle(!toggle)}
				>
					<span className='h-toggle'></span>
					<span className='h-toggle'></span>
					<span className='h-toggle'></span>
				</div>
				<div
					className={`container-burger ${toggle && 'container-burger-active'}`}
				>
					<div className={`header-burger ${toggle && 'header-burger-active'}`}>
						<div className='header-logo'>
							<NavLink to='/'>
								<img src={logo} className='header-logo'></img>
							</NavLink>
							<div
								className={toggle ? 'header-toggle-active' : ''}
								onClick={() => setToggle(!toggle)}
							>
								<span className='h-toggle'></span>
								<span className='h-toggle'></span>
								<span className='h-toggle'></span>
							</div>
						</div>
						<div className='header-search'>
							<img src={search} alt='' className='h-search-img' />
							<input
								type='text'
								value={value}
								onChange={e => onChangeInput(e)}
								className='h-search'
								placeholder='ПОИСК'
							/>
						</div>
						<ul className='header-list'>
							{nav.map((elem, index) => (
								<li key={index} className='h-list_item'>
									<NavLink
										to={`${elem.path}`}
										className={classNav}
										onClick={() => setToggle(!toggle)}
									>
										{elem.name}
									</NavLink>
								</li>
							))}
						</ul>

						<div className='header-info'>
							<div className='header_item'>
								<p className='header-common'>zakaz@loverflower.by</p>
								<p className='header-text'>
									Доставка 24/7 по договоренности с оператором
								</p>
							</div>
							<div className='header_item'>
								<p className='header-common'>ул. Тимирязева 67</p>
								<p className='header-text'>
									10:00 до 21:00 <br /> без выходных
								</p>
							</div>
							<div className='header_item'>
								<a href='#' className='header-copyright'>
									Политика конфиденциальности <br />
									Обработка персональных данных
								</a>
							</div>
							<div className='header_item'>
								<p className='header-tel'>+375 (29) 113-69-69</p>
							</div>
							<div className='header_item'>
								<img src={Inst} alt='inst' className='header-icon' />
								<img src={Viber} alt='viber' className='header-icon' />
								<img src={UsuallyCall} alt='tel' className='header-icon' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
