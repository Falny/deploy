import React from 'react'
import './style.scss'

import Square from '../../assets/Works/blackSquare.png'
import Planet from '../../assets/Works/planet.png'
import Stars from '../../assets/Works/stars.png'

import Chess from '../../assets/Works/chess.png'
import Eatly from '../../assets/Works/eatly.png'
import Flowers from '../../assets/Works/flowers.png'
import Healas from '../../assets/Works/healas.png'
import Pizza from '../../assets/Works/pizza.png'
import Snikers from '../../assets/Works/snikers.png'
import SosGame from '../../assets/Works/sos-game.png'
import Speed from '../../assets/Works/speed-text.png'
import Sudoku from '../../assets/Works/sudoku.png'
import Manages from '../../assets/Works/task-manager.png'

const list = [
	{ img: Chess, url: 'https://falny.github.io/chess/' },
	{ img: Eatly, url: 'https://eatly-demo.netlify.app' },
	{ img: Flowers, url: '/flowers' },
	{ img: Healas, url: 'https://falny.github.io/healas/' },
	{ img: Pizza, url: 'https://react-pizza-rr.netlify.app' },
	{ img: Snikers, url: 'https://react-snikers-rr.netlify.app' },
	{ img: SosGame, url: 'https://falny.github.io/sos_game/' },
	{ img: Speed, url: 'https://speed-text-practice.netlify.app' },
	{ img: Sudoku, url: 'https://sudoku-portfoliio.netlify.app' },
	{ img: Manages, url: '/task-manager' },
]

export default function Works({
	refWorks,
}: {
	refWorks: React.RefObject<null>
}) {
	return (
		<div className='works' ref={refWorks}>
			<div className='container'>
				<div className='works-block'>
					<p className='_title works-title'>
						Работы
						<span className='arrow-circle works-circle'></span>
					</p>
					<ul className='works-list'>
						{list.map((obj, index) => (
							<li className='works-item' key={index}>
								<a href={obj.url} className='works-item_link' target='_blank'>
									<img src={obj.img} alt='project' className='works-item_img' />
								</a>
								<div className='works-item_back'></div>
							</li>
						))}
					</ul>
					<img
						src={Square}
						alt='squares'
						className='works_img-square'
						loading='lazy'
					/>
					<img
						src={Planet}
						alt='planet'
						className='works_img-planet'
						loading='lazy'
					/>
					<img
						src={Stars}
						alt='stars'
						className='works_img-stars'
						loading='lazy'
					/>
				</div>
			</div>
		</div>
	)
}
