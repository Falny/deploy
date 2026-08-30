import React from 'react'
import './style.scss'

import Who900 from '../../assets/Who/who900.png'
import Who600 from '../../assets/Who/who600.png'
import Who400 from '../../assets/Who/who400.png'
import Who200 from '../../assets/Who/who200.png'
import Who100 from '../../assets/Who/who100.png'
import Human900 from '../../assets/Who/whoHuman900.png'
import Human600 from '../../assets/Who/whoHuman600.png'
import Human400 from '../../assets/Who/whoHuman400.png'
import Human200 from '../../assets/Who/whoHuman200.png'

import useMotion from '../../Hook/useMotion'

export default function WhoAmI({
	refAbout,
}: {
	refAbout: React.RefObject<null>
}) {
	const ref = React.useRef<HTMLDivElement>(null)

	const isVisible = useMotion({ ref })

	return (
		<section className={`who ${isVisible ? 'who-active' : ''}`} ref={ref}>
			<div className='container'>
				<div className='who-block' ref={refAbout}>
					<div className='who-text_right'>
						<div
							className='who-text_section who-item'
							style={{ '--order': 3 } as React.CSSProperties}
						>
							<p className='who-text_header text-size_p'>Обсуждаем задачу</p>
							<p className='who-text'>Определяем цели и задачи проекта</p>
							<span className='who-arrow'>&#8595;</span>
						</div>
						<div
							className='who-text_section who-item'
							style={{ '--order': 4 } as React.CSSProperties}
						>
							<p className='who-text_header text-size_p'>Продумываем решение</p>
							<p className='who-text size'>
								Создаем структуру и план разработки
							</p>
							<span className='who-arrow'>&#8595;</span>
						</div>
						<div
							className='who-text_section who-item'
							style={{ '--order': 5 } as React.CSSProperties}
						>
							<p className='who-text_header text-size_p'>Разрабатываем</p>
							<p className='who-text size'>Превращаем идею в готовый продукт</p>
							<span className='who-arrow'>&#8595;</span>
						</div>
						<div
							className='who-text_section who-item'
							style={{ '--order': 6 } as React.CSSProperties}
						>
							<p className='who-text_header text-size_p'>Запускаем</p>
							<p className='who-text size'>Публикуем проект в интернете</p>
						</div>
					</div>
					<div
						className='who-text_left who-item'
						style={{ '--order': 2 } as React.CSSProperties}
					>
						<p className='who-text size'>Создаю интерфейсы и серверную часть</p>
						<p className='who-text size'>
							Превращаю идеи в удобные и современные цифровые продукты
						</p>
						<p className='who-text size'>
							Для меня важны качество, удобство и результат
						</p>
					</div>
					<picture
						className='who-img who-item'
						style={{ '--order': 1 } as React.CSSProperties}
					>
						<source srcSet={Who100} media='(max-width: 400px)' />
						<source srcSet={Who200} media='(max-width: 600px)' />
						<source srcSet={Who400} media='(max-width: 800px)' />
						<source srcSet={Who600} media='(max-width: 1200px)' />
						<img
							srcSet={Who900}
							alt='text'
							className='who_img-main'
							loading='lazy'
							width={1085}
							height={215}
						/>
					</picture>
					<span className='back who-triangle'></span>
					<picture>
						<source srcSet={Human200} media='(max-width: 400px)' />
						<source srcSet={Human400} media='(max-width: 720px)' />
						<source srcSet={Human600} media='(max-width: 1200px)' />
						<img
							srcSet={Human900}
							alt='human'
							className='who_img-triangle'
							loading='lazy'
							width={225}
							height={170}
						/>
					</picture>
				</div>
			</div>
		</section>
	)
}
