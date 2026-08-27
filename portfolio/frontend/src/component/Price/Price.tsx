import React from 'react'
import './style.scss'

import Price900 from '../../assets/Price/price900.png'
import Price600 from '../../assets/Price/price600.png'
import Price400 from '../../assets/Price/price400.png'
import Price200 from '../../assets/Price/price200.png'

import useMotion from '../../Hook/useMotion'

export default function Price({
	refPrice,
}: {
	refPrice: React.RefObject<null>
}) {
	const ref = React.useRef<HTMLDivElement>(null)

	const isVisible = useMotion({ ref })

	const seo = () => {
		return (
			<ul className='seo-note_list'>
				<li className='seo-note_item'>title, meta, description</li>
				<li className='seo-note_item'>семантика</li>
				<li className='seo-note_item'>sitemap.xml</li>
				<li className='seo-note_item'>robots.txt</li>
			</ul>
		)
	}

	return (
		<section className={`price ${isVisible ? 'price-active' : ''}`} ref={ref}>
			<div className='container'>
				<div className='price-container'>
					<p className='_title price-title' ref={refPrice}>
						предложения
						<span className='arrow-circle'></span>
					</p>
					<div className='price-price'>
						<div
							className='price-block_price'
							style={{ '--order': 1 } as React.CSSProperties}
						>
							<div className='price-wrapper'>
								<div className='price-block_price-title text-size_p'>
									По самому проекту
								</div>
								<div className='price-block_text'>
									<ul className='price-text_list'>
										<li className='price-text_item size'>Нарисовать дизайн</li>
										<li className='price-text_item size note-seo'>
											базовое SEO
											{seo()}
										</li>
										<li className='price-text_item size'>Адаптивная верстка</li>
										<li className='price-text_item size'>
											Подключение базы данных
										</li>
										<li className='price-text_item size'>Серверная часть</li>
										<li className='price-text_item size'>Деплой сайта</li>
									</ul>
								</div>
							</div>
						</div>
						<div
							className='price-block_price'
							style={{ '--order': 2 } as React.CSSProperties}
						>
							<div className='price-wrapper'>
								<div className='price-block_price-title text-size_p'>
									По наполнению проекта
								</div>
								<div className='price-block_text'>
									<ul className='price-text_list'>
										<li className='price-text_item size'>Формы связи</li>
										<li className='price-text_item size'>Корзина</li>
										<li className='price-text_item size'>
											Авторицаия / Регистрация
										</li>
										<li className='price-text_item size'>Админ панель</li>
										<li className='price-text_item size'>Анимации</li>
										<li className='price-text_item size'>Фильтры</li>
										<li className='price-text_item size'>Поиск</li>
										<li className='price-text_item size'>Навигация</li>
										<li className='price-text_item size'>Дашборды</li>
										<li className='price-text_item size'>Графики</li>
										<li className='price-text_item size'>Профиль</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<p className='price-text size'>
						*Стоймость для каждого проекта расчитывается индивидуально
					</p>
					<picture
						className='price-item3'
						style={{ '--order': 3 } as React.CSSProperties}
					>
						<source srcSet={Price200} media='(max-width: 480px)' />
						<source srcSet={Price400} media='(max-width: 820px)' />
						<source srcSet={Price600} media='(max-width: 1200px)' />
						<img
							srcSet={Price900}
							alt='human'
							className='price-img'
							loading='lazy'
							width={830}
							height={420}
						/>
					</picture>
				</div>
			</div>
		</section>
	)
}
