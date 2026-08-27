import { Outlet } from 'react-router-dom'
import { Header } from './components/header'
import { Footer } from './components/footer'

export const Layout = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />
			<div style={{ flexGrow: 1 }}>
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}
