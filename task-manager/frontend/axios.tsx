import axios from 'axios'

export const instance = axios.create({
	baseURL: '/api',
	allowAbsoluteUrls: true,
})

export const instancePrivate = axios.create({
	baseURL: '/api',
	allowAbsoluteUrls: true,
})

instancePrivate.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	const method = config.method?.toLocaleUpperCase() === 'POST' || 'PUT'
	if (token) {
		config.headers.Authorization = token
	}
	if (token && method) {
		config.data = config.data || {}
		config.data.token = token
	}
	return config
})
