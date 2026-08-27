import './style.scss'
import { Link } from 'react-router-dom'
import { Scroll } from '../../hook/scrollToTop'
import { StyleButton } from '../../hook/cardHook/styleButton'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import {
	fetchPostCart,
	setCount,
	FetchUpdate,
} from '../../redux/slices/cartSlice'

interface cardProps {
	className?: string
	id: string
	mainImg: string
	name: string
	price: number
}

export const Card = ({ className, id, mainImg, name, price }: cardProps) => {
	const dispatch = useDispatch<AppDispatch>()
	const { scrollToTop } = Scroll()
	const { clickBtn, btnAnimation } = StyleButton()
	const cart = useSelector((state: RootState) => state.carts.items)

	const addItemCart = async (id: string) => {
		btnAnimation()
		const itemCart = cart.find(obj => obj.idGood === id)
		if (itemCart) {
			const count = itemCart.count + 1
			dispatch(setCount({ id: itemCart.id, count }))
			dispatch(FetchUpdate({ id: itemCart.id, count }))
			return
		}
		await dispatch(fetchPostCart(id))
	}

	return (
		<>
			<div className='card'>
				<Link to={`/catalog/${id}`}>
					<img
						src={mainImg}
						alt=''
						className={`card-img ${className}`}
						onClick={() => scrollToTop}
					/>
				</Link>
				<div className='card-description'>
					<p className='card-name'>{name}</p>
					<p className='card-price'>{price} ₽</p>
					<button
						type='button'
						className={`card-btn ${clickBtn && 'btn-animate'}`}
						onClick={() => addItemCart(id)}
					>
						{clickBtn ? 'Добавлено в корзину' : 'В корзину'}
					</button>
				</div>
			</div>
		</>
	)
}
