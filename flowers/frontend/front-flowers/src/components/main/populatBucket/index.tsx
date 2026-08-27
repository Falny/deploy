import './style.scss'
import { Card } from '../../card'
import ArrowLeft from '../../../assets/common/arrow-left.png'
import ArrowRight from '../../../assets/common/arrow-right.png'
import ArrowPink from '../../../assets/common/arrow-pink.png'
import { useSelector } from 'react-redux'
import { cards } from '../../../hook/SELECTORS/selectors'
import { Scroll } from '../../../hook/scrollToTop'
import React from 'react'

export const PopularBucket = () => {
	const card = useSelector(cards)
	const { scrollToTop } = Scroll()
	const [index, setIndex] = React.useState<number>(0)
	const refLeft = React.useRef<HTMLImageElement>(null)
	const refRight = React.useRef<HTMLImageElement>(null)
	const refWidthImg = React.useRef<HTMLDivElement>(null)
	const [widthImg, setWidthImg] = React.useState(0)

	const numSlice = 3
	const sliceImg = card.slice(index, index + numSlice)

	React.useEffect(() => {
		if (refWidthImg.current) {
			setWidthImg(refWidthImg.current.offsetWidth)
		}

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
			<div className='popular-bucket'>
				<div className='container'>
					<div className='popular-bucket-title'>
						<h3 className='title'>Популярные</h3>
						<h3 className='title title-config'>букеты</h3>
					</div>
					<p className='popular-bucket-text'>
						Самые любимые композиции наших клиентов
					</p>
					<div className='light-pink pb-pink'></div>
					<div className='light-green pb-green'></div>
					<div className='popular-bucket-carousel'>
						<div className='pb-carousel'>
							<img src={ArrowLeft} className='arrow-left arrow' ref={refLeft} />
							<div
								className='carousel-carousel'
								style={{
									minWidth:
										window.innerWidth > 670
											? `${widthImg * numSlice}px`
											: 'auto',
								}}
							>
								<div
									className='carousel-block'
									style={{
										transform: `translateX(-${widthImg * index * 0.1}px)`,
										transition: 'all .3s',
									}}
								>
									{sliceImg.map(el => (
										<div
											key={el.id}
											onClick={() => scrollToTop()}
											ref={refWidthImg}
										>
											<Card className='grey-card' {...el} />
										</div>
									))}
								</div>
							</div>
							<img
								src={ArrowRight}
								className='arrow-right arrow'
								ref={refRight}
							/>
						</div>
					</div>
					<div className='pb_watch-catalog'>
						<p className='pb_watch-text'>смотреть весь каталог</p>
						<img src={ArrowPink} alt='' className='pb_watch-img' />
					</div>
				</div>
			</div>
		</>
	)
}
