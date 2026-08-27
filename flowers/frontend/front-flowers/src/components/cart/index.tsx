import React from 'react'
import './style.scss'

import type { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

import { Context } from '../../App'
import { Link } from 'react-router-dom'
import { CartItems } from '../cartItems'
import { resultSum } from '../../hook/resultCart'

export const Cart = () => {
	const cart = useSelector((state: RootState) => state.carts.items)

	const { openCart, setOpenCart } = React.useContext(Context)
	const { totalSum } = resultSum()

	React.useEffect(() => {
		if (openCart) {
			document.body.style.overflowY = 'hidden'
		} else {
			document.body.style.overflowY = 'scroll'
		}
	}, [openCart])

	return (
		<>
			<div className={`cart-container ${openCart && 'cart-active'}`}>
				<div className='cart'>
					<div className='cart-block-top'>
						<div className='cart-header'>
							<h3 className='cart-title'>Ваша корзина</h3>
							<span
								className='cart-close'
								onClick={() => setOpenCart(!openCart)}
							></span>
						</div>
						<div className='cart-items-block'>
							{cart.map(el => (
								<div key={el.id} className='cart-item'>
									<CartItems {...el} />
								</div>
							))}
						</div>
					</div>
					<div className='cart-block-bottom'>
						<p className='cart-result'>Предварительный итог: {totalSum} руб.</p>
						<p className='cart-text'>
							Чтобы узнать стоимость доставки, перейдите к оформлению заказа.
						</p>
						<Link to='/cart' onClick={() => setOpenCart(!openCart)}>
							<button className='cart-btn'>Оформить заказ</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
