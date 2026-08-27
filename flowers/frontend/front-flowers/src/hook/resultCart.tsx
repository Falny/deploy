import { useSelector } from 'react-redux'
import { carts } from './SELECTORS/selectors'

export const resultSum = () => {
	const cart = useSelector(carts)
	const totalSum = cart
		.reduce((sum, item) => item.price * item.count + sum, 0)
		.toFixed(2)
	return { totalSum }
}

export const resultLength = () => {
	const cart = useSelector(carts)
	return { lenght: cart.length }
}
