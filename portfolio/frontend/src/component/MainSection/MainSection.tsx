import React from 'react'
import './style.scss'
import Arrow from '../../assets/MainSection/arrow.png'
import Square from '../../assets/MainSection/square.png'
import Lines from '../../assets/MainSection/lines.png'
import Lines500 from '../../assets/MainSection/lines500.png'
import Circle from '../../assets/MainSection/circle.png'

import Main900 from '../../assets/MainSection/main.png'
import Main700 from '../../assets/MainSection/main700.png'
import Main500 from '../../assets/MainSection/main500.png'

export default function MainSection({
	refWorks,
}: {
	refWorks: React.RefObject<HTMLElement | null>
}) {
	let textGreet = 'Привет!'
	const [text, setText] = React.useState('')
	const [index, setIndex] = React.useState(0)

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
			</div>
		</section>
	)
}
