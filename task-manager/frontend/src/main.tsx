import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './app/App.tsx'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter basename='/task-manager'>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
)
