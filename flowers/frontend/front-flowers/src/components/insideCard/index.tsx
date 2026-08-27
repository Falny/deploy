import './style.scss'
import { DopCard } from './dopCard'
import { CarouselInsideCart } from './carousel'
import { Breadcrumbs } from '../bredcrams'
import { useNavigate } from 'react-router-dom'
import { useCommomLogicCard } from '../../hook/insideCardHook/commomLigicCard'
import React from 'react'
import type { AppDispatch, RootState } from '../../redux/store'
import {
	fetchPostCart,
	setCount,
	FetchUpdate,
} from '../../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { InteractionItem } from '../../hook/cartItemsHook/interactionItem'

export const InsideCard = React.memo(() => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const ref = React.useRef<HTMLImageElement>(null)
	const [widthImg, setWidthImg] = React.useState(0)
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

	const { updateItem } = InteractionItem()
	const cart = useSelector((state: RootState) => state.carts.items)

	const CheckWidth = windowWidth > 465

	const { card, arrowBottomRef, arrowTopRef, sliceImages, carouselIndex } =
		useCommomLogicCard()

	React.useEffect(() => {
		if (ref.current) {
			setWidthImg(ref.current.height)
		}
		const handleWidth = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleWidth)

		return () => {
			window.removeEventListener('resize', handleWidth)
		}
	}, [])

	const onClickAddItemCart = async (id: string) => {
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
			<div className='inside-card'>
				<div className='container'>
					<Breadcrumbs />
					<div className='inside-card_container'>
						<div className='inside-card_left'>
							<div className='container-carousel'>
								<span
									className='carousel-arrow carousel-arrow-top'
									ref={arrowTopRef}
								>
									&lt;
								</span>
								<div
									className='carousel-carousel'
									style={{ height: CheckWidth ? '400px' : 'fit-content' }}
								>
									<div
										className='carousel'
										style={{
											transform: `${
												CheckWidth
													? `translateY(-${carouselIndex * widthImg * 0.1}px)`
													: `translateX(-${carouselIndex * widthImg}px)`
											}`,
											transition: 'all 0.3s',
										}}
									>
										{sliceImages.map((el, index) => (
											<img
												key={index}
												src={el}
												alt='img'
												className='carousel-card-item'
												ref={ref}
											/>
										))}
									</div>
								</div>
								<span
									className='carousel-arrow carousel-arrow-bottom'
									ref={arrowBottomRef}
								>
									&lt;
								</span>
							</div>

							<img src={card.mainImg} alt='' className='main-img' />
						</div>
						<div className='inside-card_right'>
							<div className='ic_right-back' onClick={() => navigate(-1)}>
								<span className='ic_right-arrow'> &lt; </span>
								<p className='ic_right-text'>назад</p>
							</div>
							<div className='ic_right-info'>
								<div className='info-head'>
									<div className='user-select info-title'>{card.name}</div>
									<div className='ic_right-info-price'>
										<div className='user-select info-price'>{card.price} P</div>
										<div className='info-old-price'>
											{card?.oldPrice ? `${card.oldPrice} P` : ''}
										</div>
									</div>
								</div>
								<div className='user-select info-structura'>
									<span className=' structura-title'>состав:</span>
									{card.structure}
								</div>
								<div className='info-text'>
									Завораживающая глубина ваших чувств передана огненными
									красками этого букета
								</div>
								<div className='user-select info-category'>
									<span className=' category-title'>категории:</span>
									{card.category.map(el => (
										<li className='info-category_item' key={el}>
											{el}
										</li>
									))}
								</div>
							</div>
							<div className='ic_right-cart'>
								<button
									className='cart-btn'
									onClick={() => onClickAddItemCart(card.id)}
								>
									В корзину
								</button>
								<div className='card-count'>
									<div
										className='count'
										onClick={() =>
											updateItem({ id: card.id, type: '-', count: card.count })
										}
									>
										-
									</div>
									<div className='count-number'> {card.count} </div>
									<div
										className='count'
										onClick={() =>
											updateItem({ id: card.id, type: '+', count: card.count })
										}
									>
										+
									</div>
								</div>
							</div>
						</div>
					</div>
					<DopCard title={card.name} />
					<CarouselInsideCart />
				</div>
				<div className='mini-light-green common card-top-green'></div>
				<div className='mini-light-pink common card-top-right-pink'></div>
				<div className='light-pink common card-top-left-pink'></div>
				<div className='light-pink common card-center-pink'></div>
				<div className='light-green common card-right-green'></div>
				<div className='mini-light-green common card-bottom-green'></div>
				<div className='light-green common card-bottom-center-green'></div>
				<div className='mini-light-pink common card-bottom-right-pink'></div>
			</div>
		</>
	)
})
