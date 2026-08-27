import React from 'react'
import './App.scss'

import { Routes, Route } from 'react-router-dom'
import type { AppDispatch, RootState } from './redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { FetchCards } from './redux/slices/cardsSlice'

import { RouteImport } from './importAllFile'
import { FetchSorts } from './redux/slices/sortSlice'
import { fetchCart } from './redux/slices/cartSlice'

interface AppContextInteface {
	openCart: boolean
	setOpenCart: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext: AppContextInteface = {
	openCart: false,
	setOpenCart: () => false,
}

export const Context = React.createContext<AppContextInteface>(AppContext)

function App() {
	const [openCart, setOpenCart] = React.useState<boolean>(false)
	const dispatch = useDispatch<AppDispatch>()

	const category = useSelector((state: RootState) => state.filters.category)
	const light = useSelector((state: RootState) => state.filters.light)
	const color = useSelector((state: RootState) => state.filters.color)
	const format = useSelector((state: RootState) => state.filters.format)
	const structure = useSelector((state: RootState) => state.filters.structure)

	React.useEffect(() => {
		dispatch(FetchCards({ category, light, color, format, structure }))
		dispatch(FetchSorts())
	}, [category, light, color, format, structure])

	React.useEffect(() => {
		dispatch(fetchCart())
	}, [])

	return (
		<>
			<Context.Provider value={{ openCart, setOpenCart }}>
				<div className='app-container'>
					<Routes>
						<Route path='/' element={<RouteImport.Layout />}>
							<Route index element={<RouteImport.DisplayMain />} />
							<Route path='cart' element={<RouteImport.Order />} />
							<Route path='success-pay' element={<RouteImport.SuccessPay />} />
							<Route path='error-pay' element={<RouteImport.FallPay />} />
							<Route path='catalog' element={<RouteImport.Catalog />} />
							<Route
								path='delivery-and-pay'
								element={<RouteImport.DeliveryAndPay />}
							/>
							<Route path='about' element={<RouteImport.About />} />
							<Route path='contact' element={<RouteImport.Contact />} />
							<Route path='faq' element={<RouteImport.Faq />} />
							<Route path='catalog/:id' element={<RouteImport.InsideCard />} />
							<Route path='search' element={<RouteImport.Search />} />
							<Route path='*' element={<RouteImport.FallPage />} />
						</Route>
					</Routes>
					<RouteImport.Cart />
				</div>
			</Context.Provider>
		</>
	)
}

export default App
