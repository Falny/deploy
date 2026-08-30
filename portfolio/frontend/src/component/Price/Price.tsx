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
						услуги
						<span className='arrow-circle'></span>
					</p>
					<div className='price-price'>
						<div
							className='price-block_price'
							style={{ '--order': 1 } as React.CSSProperties}
						>
							<div className='price-wrapper'>
								<div className='price-block_price-title text-size_p'>
									Разработка сайта
								</div>
								<ul className='price-text_list'>
									<li className='price-text_item size'>Дизайн интерфейса</li>
									<li className='price-text_item size note-seo'>
										базовая SEO настройка
										{seo()}
									</li>
									<li className='price-text_item size'>Адаптивная верстка</li>
									<li className='price-text_item size'>
										Подключение базы данных
									</li>
									<li className='price-text_item size'>Серверная часть</li>
									<li className='price-text_item size'>
										Публикация сайта в интернет
									</li>
								</ul>
							</div>
						</div>
						<div
							className='price-block_price'
							style={{ '--order': 2 } as React.CSSProperties}
						>
							<div className='price-wrapper'>
								<div className='price-block_price-title text-size_p'>
									Функциональность
								</div>
								<ul className='price-text_list'>
									<li className='price-text_item size'>
										Авторизация и регистрация
									</li>
									<li className='price-text_item size'>
										Административная панель
									</li>
									<li className='price-text_item size'>
										Анимации и интерактивные элементы
									</li>
									<li className='price-text_item size'>
										Загрузка файлов и изображений
									</li>
									<li className='price-text_item size'>
										Интеграция с внешними сервисами
									</li>
								</ul>
							</div>
						</div>
						<div
							className='price-block_price'
							style={{ '--order': 3 } as React.CSSProperties}
						>
							<div className='price-wrapper'>
								<div className='price-block_price-title text-size_p'>
									Наполнение
								</div>
								<ul className='price-text_list'>
									<li className='price-text_item size'>Формы обратной связи</li>
									<li className='price-text_item size'>
										Корзина и оформление заказа
									</li>
									<li className='price-text_item size'>Поиск и фильтрация</li>
									<li className='price-text_item size'>Навигация</li>
									<li className='price-text_item size'>Дашборды</li>
									<li className='price-text_item size'>Графики и статистика</li>
									<li className='price-text_item size'>Профиль</li>
								</ul>
							</div>
						</div>
						<div
							className='price-block_price'
							style={{ '--order': 4 } as React.CSSProperties}
						>
							<div className='price-wrapper'>
								<div className='price-block_price-title text-size_p'>
									Доработка существующего проекта
								</div>
								<ul className='price-text_list'>
									<li className='price-text_item size'>Исправление ошибок</li>
									<li className='price-text_item size'>
										Добавление нового функционала
									</li>
									<li className='price-text_item size'>Обновление дизайна</li>
									<li className='price-text_item size'>Улучшение интерфейса</li>
									<li className='price-text_item size'>
										Адаптация под мобильные устройства
									</li>
									<li className='price-text_item size'>
										Исправление проблем с отображением
									</li>
									<li className='price-text_item size'>
										Помощь с доменом и SSL сертификатом
									</li>
								</ul>
							</div>
						</div>
					</div>
					<p className='price-text size'>
						*Стоимость для каждого проекта рассчитывается индивидуально
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
