import './style.scss'
import { useSelector } from 'react-redux'
import { Card } from '../card'
import { Breadcrumbs } from '../bredcrams'
import { Link } from 'react-router-dom'
import { cards, searches } from '../../hook/SELECTORS/selectors'

export const Search = () => {
	const search = useSelector(searches)
	const card = useSelector(cards)

	const cardFind = card.filter(el =>
		el.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
	)

	return (
		<>
			<div className='search'>
				<div className='container'>
					<Breadcrumbs />
					<div className='search-container'>
						<h4 className='search-title'>Результат поиска: {search}</h4>
						{cardFind.length !== 0 ? (
							<div className='search-items'>
								{cardFind.map(el => (
									<div className='search-find' key={el.id}>
										<Card {...el} />
									</div>
								))}
							</div>
						) : (
							<div className='search-no-find'>
								<p className='search-text'>
									По данному запросу ничего не найдено. <br /> Попробуйте еще
									раз или перейдите в каталог
								</p>
								<Link to='/catalog'>
									<button className='search-to'>В каталог</button>
								</Link>
							</div>
						)}
					</div>
				</div>
				<div className='mini-light-green common green-top'></div>
				<div className='light-pink common pink-top'></div>
				<div className='light-green common green-bottom'></div>
				<div className='mini-light-pink common pink-bottom'></div>
			</div>
		</>
	)
}
