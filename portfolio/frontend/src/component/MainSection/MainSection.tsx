import React from 'react'
import './style.scss'
import Arrow from '../../assets/MainSection/arrow.png'
import Square from '../../assets/MainSection/square.png'
import Lines from '../../assets/MainSection/lines.png'
import Lines500 from '../../assets/MainSection/lines500.png'
import Circle from '../../assets/MainSection/circle.png'
import Text from '../../assets/MainSection/text.png'
import Text500 from '../../assets/MainSection/text500.png'
import Colors from '../../assets/MainSection/colors.png'

import Main900 from '../../assets/MainSection/main.png'
import Main700 from '../../assets/MainSection/main700.png'
import Main500 from '../../assets/MainSection/main500.png'

import LinesRotate_340 from '../../assets/MainSection/rotateLines_340px.png'
import LinesRotate_180 from '../../assets/MainSection/rotateLines_180px.png'

import useMotion from '../../Hook/useMotion'

export default function MainSection({
	refWorks,
}: {
	refWorks: React.RefObject<HTMLElement | null>
}) {
	let textGreet = 'Привет!'
	const [text, setText] = React.useState('')
	const [index, setIndex] = React.useState(0)
	const ref = React.useRef<HTMLDivElement>(null)

	const isVisible = useMotion({ ref })

	React.useEffect(() => {
		if (index >= textGreet.length) return

		const timer = setTimeout(() => {
			setText(prev => prev + textGreet[index])
			setIndex(prev => prev + 1)
		}, 250)

		return () => clearTimeout(timer)
	}, [index])

	const handleScroll = () => {
		if (!refWorks) return
		if (refWorks.current) {
			refWorks.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	return (
		<section className='main-section'>
			<div className='container'>
				<img src={Arrow} alt='arrow' className='navigation_img-arrow' />
				<img src={Square} alt='squares' className='navigation_img-square' />
				<span className='back nav-back'></span>
				<section className='block'>
					<div className='main-block_text'>
						<div className='text-section'>
							<p className='main-block_text-greeting-main'>{text}</p>
							<p className='main-block_text-greeting size'>
								Я разрабатываю сайты
							</p>
							<p className='main-block_text-greeting size'>
								Все что угодно из ваших идей, я могу реализовать в коде
							</p>
							<p className='main-block_text-nav' onClick={() => handleScroll()}>
								Посмотрите, что я могу вам предложить
							</p>
						</div>
						<img
							srcSet={`${Lines500} 640w, ${Lines}`}
							className='main-block_img-lines'
							sizes='(max-width: 640px) 640px, 1920px'
							alt='lines'
						/>
						<img src={Circle} alt='circles' className='main-block_img-circle' />
						<span className='back main-back'></span>
					</div>
					<div className='block_group-img'>
						<img
							srcSet={`${Main500} 450w, ${Main700} 800w, ${Main900} 1100w`}
							className='main-img'
							alt='human'
						/>
					</div>
				</section>
				{/* <section className='block-stek'>
					<div
						className={`block-circle ${isVisible ? 'block-circle_active' : ''}`}
						ref={ref}
					>
						<div className='circle-container'>
							<p className='_title circle-title'>
								СТЕК
								<span className='arrow-circle'></span>
							</p>
							<span className='circle-name size circle1'>JavaScript</span>
							<span className='circle-name size circle2'>Java</span>
							<span className='circle-name size circle3'>Spring</span>
							<span className='circle-name size circle4'>Postgresql</span>
							<span className='circle-name size circle5'>TypeScript</span>
							<span className='circle-name size circle6'>React</span>
							<div className='circle-main'></div>
						</div>
					</div>
					<img
						src={Circle}
						alt='circles'
						className='block-circle_img-circle'
						loading='lazy'
					/>
					<picture>
						<source srcSet={LinesRotate_180} media='(max-width:640px)' />
						<img
							src={LinesRotate_340}
							className='block-circle_img-lines'
							alt='lines'
							loading='lazy'
							width={340}
							height={60}
						/>
					</picture>
					<picture>
						<source srcSet={Text500} media='(max-width:640px)' />
						<img
							srcSet={Text}
							className='block-circle_img-text'
							sizes='(max-width: 640px) 640px, 1920px'
							alt='text'
							loading='lazy'
							width={70}
							height={500}
						/>
					</picture>
					<img
						src={Colors}
						alt='colors'
						className='block-circle_img-colors'
						loading='lazy'
						width={90}
						height={110}
					/>
				</section> */}
			</div>
		</section>
	)
}
