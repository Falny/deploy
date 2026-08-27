import './style.scss'
import { useSelector } from 'react-redux'
import { Card } from '../../card'
import ArrowLeft from '../../../assets/carousel/arrow-left.svg'
import ArrowRight from '../../../assets/carousel/arrow-right.svg'
import { cards } from '../../../hook/SELECTORS/selectors'
import React from 'react'
import { Scroll } from '../../../hook/scrollToTop'

export const CarouselInsideCart = React.memo(() => {
	const { scrollToTop } = Scroll()
	const card = useSelector(cards)
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
	const numSlice = windowWidth < 1350 ? 3 : 4
	const [index, setIndex] = React.useState<number>(0)
	const refLeft = React.useRef<HTMLImageElement>(null)
	const refRight = React.useRef<HTMLImageElement>(null)

	React.useEffect(() => {
		const handleWidth = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleWidth)

		return () => {
			window.removeEventListener('resize', handleWidth)
		}
	}, [])

	const cardCarousel =
		windowWidth < 1350
			? card.slice(index, index + numSlice)
			: card.slice(index, index + numSlice)

	React.useEffect(() => {
		const handleLeftClick = () => {
			if (index - 1 < 0) return
			setIndex(prev => prev - 1)
		}

		const handleRightClick = () => {
			if (index + numSlice >= card.length) return
			setIndex(prev => prev + 1)
		}

		refLeft.current?.addEventListener('click', handleLeftClick)
		refRight.current?.addEventListener('click', handleRightClick)

		return () => {
			refLeft.current?.removeEventListener('click', handleLeftClick)
			refRight.current?.removeEventListener('click', handleRightClick)
		}
	}, [index, card.length])

	return (
		<>
			<div className='carousel-container'>
				<p className='carousel-text'>вам может понравиться:</p>
				<div className='carousel'>
					<img
						src={ArrowLeft}
						className='carousel-arrow arrow-left'
						ref={refLeft}
					/>
					<div className='carousel-block'>
						<div className='carousel-item'>
							{cardCarousel.map(obj => (
								<div onClick={() => scrollToTop()} key={obj.id}>
									<Card className={'card-img'} {...obj} />
								</div>
							))}
						</div>
					</div>
					<img
						src={ArrowRight}
						className='carousel-arrow arrow-right'
						ref={refRight}
					/>
				</div>
			</div>
		</>
	)
})
