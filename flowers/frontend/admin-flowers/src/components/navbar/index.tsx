import React from 'react'
import './style.scss'
import { Link, Outlet } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export const Navbar = () => {
	const [toggle, setToggle] = React.useState(false)
	const ref = React.useRef<HTMLUListElement>(null)

	React.useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setToggle(false)
			}
		}

		document.addEventListener('mousedown', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [ref])

	const handleExit = () => {
		localStorage.removeItem('access')
		window.location.href = '/'
	}

	return (
		<div className='container'>
			<div className='burger-navbar' onClick={() => setToggle(!toggle)}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div className={toggle ? 'active-back' : ''}></div>
			<div className='navbar-container'>
				<ul className={`navbar ${toggle && 'active-navbar'}`} ref={ref}>
					<Link to='/navbar/add-product'>
						<li className='navbar-item'>Добавление товара</li>
					</Link>
					<Link to='/navbar/product'>
						<li className='navbar-item'>Товары</li>
					</Link>
					<Link to='/navbar/category'>
						<li className='navbar-item'>Каталог</li>
					</Link>
					<Link to='/navbar/structure'>
						<li className='navbar-item'>Состав</li>
					</Link>
					<Link to='/navbar/color'>
						<li className='navbar-item'>Цвет</li>
					</Link>
					<Link to='/navbar/light'>
						<li className='navbar-item'>Свет</li>
					</Link>
					<Link to='/navbar/format'>
						<li className='navbar-item'>Формат</li>
					</Link>
				</ul>
				<div className='exit'>
					<LogOut className='icon' onClick={() => handleExit()} />
				</div>
			</div>
			<Outlet />
		</div>
	)
}
