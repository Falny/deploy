import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router'

const InitPage = React.lazy(() => import('../pages/InitPage/InitPage'))
const MainPage = React.lazy(() => import('../pages/MainPages/MainPage'))
const Home = React.lazy(() => import('../pages/Home/Home'))
const Profile = React.lazy(() => import('../pages/Profile/Profile'))
const Project = React.lazy(() => import('../features/Project/Project'))
const Friend = React.lazy(() => import('../pages/Friend/Friend'))
const Notification = React.lazy(
	() => import('../pages/Notification/Notification'),
)
const SessionLoading = React.lazy(
	() => import('../features/SessionLoading/SessionLoading'),
)

export default function App() {
	return (
		<>
			<Routes>
				<Route index element={<InitPage />} />
				<Route element={<SessionLoading />}>
					<Route path='/tatipati' element={<MainPage />}>
						<Route path='home' element={<Home />} />
						<Route path='profile' element={<Profile />} />
						<Route path='tasks' element={<Project />} />
						<Route path='friend' element={<Friend />} />
						<Route path='notification' element={<Notification />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}
