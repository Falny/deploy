import React from 'react'
import './style.scss'

type NavProp = {
	refWorks: React.RefObject<null>
	refPrice: React.RefObject<null>
	refAbout: React.RefObject<null>
	refContact: React.RefObject<null>
}

export default function Navigation({
	refWorks,
	refAbout,
	refPrice,
	refContact,
}: NavProp) {
	const [burger, setBurger] = React.useState(false)
	const listNav: { nav: string; ref?: React.RefObject<HTMLElement | null> }[] =
		[
			{ nav: 'Работы', ref: refWorks },
			{ nav: 'услуги', ref: refPrice },
			{ nav: 'Обо мне', ref: refAbout },
			{ nav: 'Контакты', ref: refContact },
		]

	React.useEffect(() => {
		if (burger) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [burger])

	const handleClickNav = (ref?: React.RefObject<HTMLElement | null>) => {
		if (!ref) return
		if (ref.current) {
			ref.current.scrollIntoView({
				behavior: 'smooth',
			})
		}
		setBurger(false)
	}

	return (
		<nav>
			<div
				className={`burger ${burger ? 'burger-close' : 'burger-open'}`}
				onClick={() => setBurger(!burger)}
			>
				<span className='burger-item'></span>
				<span className='burger-item'></span>
				<span className='burger-item'></span>
			</div>

			<div className={`${burger ? 'nav-open' : 'nav'}`}>
				<div className='nav-container'>
					<ul className={`${burger ? 'nav-open_list' : 'nav-list'}`}>
						{listNav.map((obj, index) => (
							<li
								className='nav-item text-size_p'
								key={index}
								onClick={() => handleClickNav(obj.ref)}
							>
								{obj.nav}
							</li>
						))}
					</ul>
					<span className='back nav-back_burger'></span>
				</div>
			</div>
		</nav>
	)
}
