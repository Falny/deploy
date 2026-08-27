import './style.scss'
import { InfoOrder } from '../infoOrder/index'
import { Card } from '../card'
import { Categories } from '../categories'
import { Sort } from '../sort'
import { Breadcrumbs } from '../bredcrams'
import { cards } from '../../hook/SELECTORS/selectors'
import { useSelector } from 'react-redux'
import React from 'react'

export const Catalog = React.memo(() => {
	const card = useSelector(cards)

	const [categoryToggle, setCategoryToggle] = React.useState(false)
	const [sortToggle, setSortToggle] = React.useState(false)

	return (
		<>
			<div className='catalog'>
				<div className='container'>
					<Breadcrumbs />
					<div className='catalog-catalog'>
						<div className='catalog-top'>
							<h3 className='title'>каталог</h3>
							<div className='catalog-title'>
								<h3 className='title'>букетов</h3>
								<p className='catalog-choice'>
									В нашем магазине самый большой выбор букетов для любых
									событий:
								</p>
							</div>
						</div>
						<div className='catalog-category'>
							<Categories />
						</div>
					</div>
					<div className='catalog_sort-and-bukets'>
						<Sort />
						<div className='catalog-flowers'>
							{card.map(elem => (
								<Card key={elem.id} {...elem} />
							))}
						</div>
					</div>
					<div className='catalog-adaptive-menu'>
						<div className='menu-block'>
							<p
								className={sortToggle ? 'menu-title-active' : 'menu-title'}
								onClick={() => setSortToggle(!sortToggle)}
							>
								фильтр товаров
							</p>
							<div
								className={`menu-toggle ${sortToggle && 'menu-toggle-active'}`}
							>
								{sortToggle && <Sort />}
							</div>
						</div>
						<div className='menu-block'>
							<p
								className={categoryToggle ? 'menu-title-active' : 'menu-title'}
								onClick={() => setCategoryToggle(!categoryToggle)}
							>
								Категории
							</p>
							<div
								className={`menu-toggle ${
									categoryToggle && 'menu-toggle-active'
								}`}
							>
								{categoryToggle && <Categories />}
							</div>
						</div>
						<ul className='card-list'>
							{card.map(elem => (
								<li className='cart-list_item' key={elem.id}>
									<Card {...elem} />
								</li>
							))}
						</ul>
					</div>
				</div>
				<InfoOrder />

				<div className='light-pink catalog-pink catalog-pink-top1'></div>
				<div className='light-pink catalog-pink catalog-pink-top2'></div>
				<div className='mini-light-pink catalog-pink catalog-pink-top3'></div>
				<div className='mini-light-pink catalog-pink catalog-pink-top4'></div>
			</div>
		</>
	)
})
