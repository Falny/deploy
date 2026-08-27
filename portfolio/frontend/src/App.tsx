import React from 'react'
import './App.scss'
import MainSection from './component/MainSection/MainSection'
import Works from './component/Works/Works'
import Price from './component/Price/Price'
import WhoAmI from './component/WhoAmI/WhoAmI'
import Contact from './component/Contact/Contact'
import Navigation from './component/Navigation/Navigation'

function App() {
	const [styleArrowUp, setStyleArrowUp] = React.useState(false)
	const refWorks = React.useRef(null)
	const refPrice = React.useRef(null)
	const refAbout = React.useRef(null)
	const refContact = React.useRef(null)

	React.useEffect(() => {
		const handleScroll = () => {
			setStyleArrowUp(window.scrollY > 300)
		}
		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<main className='main'>
			<span
				className={`arrow-up ${styleArrowUp ? 'arrow-up_show' : 'arrow-up_hidden'}`}
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			>
				&uarr;
			</span>
			<div className='container navigation'>
				<Navigation
					refWorks={refWorks}
					refPrice={refPrice}
					refAbout={refAbout}
					refContact={refContact}
				/>
			</div>
			<MainSection refWorks={refWorks} />
			<Works refWorks={refWorks} />
			<Price refPrice={refPrice} />
			<WhoAmI refAbout={refAbout} />
			<Contact refContact={refContact} />
		</main>
	)
}

export default App
