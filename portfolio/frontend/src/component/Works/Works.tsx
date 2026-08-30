import React from 'react'
import './style.scss'

import Square from '../../assets/Works/blackSquare.png'
import Planet from '../../assets/Works/planet.png'
import Stars from '../../assets/Works/stars.png'

import Eatly from '../../assets/Works/eatly.png'
import Flowers from '../../assets/Works/flowers.png'
import Healas from '../../assets/Works/healas.png'
import Pizza from '../../assets/Works/pizza.png'
import Snikers from '../../assets/Works/snikers.png'
import SosGame from '../../assets/Works/sos-game.png'
import Sudoku from '../../assets/Works/sudoku.png'
import Manages from '../../assets/Works/task-manager.png'

import useMotion from '../../Hook/useMotion'

const list = [
	{
		img: Flowers,
		url: '/flowers',
		title: 'Магазин цветов',
		text: 'Приятный дизайн, каталог товаров, фильтрация и сортировка, административная панель',
		stek: 'React, TypeScript, Axios, React-Router, SaSS, ReduxToolkit, Java, Spring, PostgreSQL',
	},
	{
		img: Manages,
		url: '/task-manager',
		title: 'Таск-менеджер',
		text: 'Регистрация, авторизация, API яндекса для входа. Профиль, друзья, уведомления, статистика, CRUD задач и проектов',
		stek: 'React, TypeScript, Axios, React-Router, React-chartjs-2, SaSS, ReduxToolkit, Java, PostgreSQL',
	},
	{
		img: Eatly,
		url: 'https://eatly-demo.netlify.app',
		title: 'Eatly',
		text: 'Интернет-ресторан, реализована корзина, рестораны и переходы к их товарам, приятный интерфейс, интерактивный дизайн',
		stek: 'React, CSS, Motion, React-Router',
	},
	{
		img: Healas,
		url: 'https://falny.github.io/healas/',
		title: 'Healas',
		text: 'Простой лендинг с интерактивными элементами',
		stek: 'JavaScript, CSS, HTML',
	},
	{
		img: Pizza,
		url: 'https://react-pizza-rr.netlify.app',
		title: 'Ресторан пиццы',
		text: 'Небольшой магазин пиццы, реализовано добавление товаров в корзину, оформление заказа, сортировка и фильтрация',
		stek: 'React, TypeScript, Axios, React-Router, SaSS, ReduxToolkit, React-paginate',
	},
	{
		img: Snikers,
		url: 'https://react-snikers-rr.netlify.app',
		title: 'Магазин кроссовок',
		text: 'Небольшой магазин кроссовок, разработана страница избранного, добавление в корзину, оформление заказа, сортировка и фильтрация',
		stek: 'React, Axios, React-Router, SaSS',
	},
	{
		img: SosGame,
		url: 'https://falny.github.io/sos_game/',
		title: 'SosGame',
		text: 'Простой лендинг с интерактивными элементами',
		stek: 'JavaScript, CSS, HTML',
	},
	{
		img: Sudoku,
		url: 'https://sudoku-portfoliio.netlify.app',
		title: 'Судоку',
		text: 'Игра в судоку, написание алгоритма генерации судоку, работа с подсветкой, заметками, логика выигрыша',
		stek: 'React, TypeScript, SaSS, ReduxToolkit',
	},
]

export default function Works({
	refWorks,
}: {
	refWorks: React.RefObject<null>
}) {
	const ref = React.useRef(null)

	const isVisible = useMotion({ ref })

	return (
		<div className='works'>
			<div className='container'>
				<div className='works-block' ref={refWorks}>
					<p className='_title works-title'>
						Работы
						<span className='arrow-circle works-circle'></span>
					</p>
					<ul
						className={`works-list ${isVisible ? 'works-active' : ''}`}
						ref={ref}
					>
						{list.map((obj, index) => (
							<li
								className='works-item'
								key={index}
								style={{ '--order': index + 1 } as React.CSSProperties}
							>
								<a href={obj.url} className='works-item_link' target='_blank'>
									<img src={obj.img} alt='project' className='works-item_img' />
								</a>
								<div className='works-item_block'>
									<p className='works-item_block-title text-size_p'>
										{obj.title}
									</p>
									<p className='works-item_block-text size'>{obj.text}</p>
									<p className='works-item_block-stek size'>{obj.stek}</p>
								</div>
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
