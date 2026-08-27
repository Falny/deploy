import './style.scss'

import { InteractionItem } from '../../hook/cartItemsHook/interactionItem'

type cartProps = {
	id: string
	mainImg: string
	name: string
	price: number
	count: number
}

export const CartItems = ({ id, mainImg, name, price, count }: cartProps) => {
	const { deleteItem, updateItem } = InteractionItem()

	return (
		<>
			<div className='cart-items'>
				<div className='cart-items-block'>
					<img src={mainImg} alt='' className='cart-img' />
					<div className='cart-items-info'>
						<p className='cart-items-title'>{name}</p>
						<div className='cart-items-count'>
							<div
								className='cart-count cart-count-minus'
								onClick={() => updateItem({ id: id, type: '-', count })}
							>
								-
							</div>
							<div className='cart-num'>{count}</div>
							<div
								className='cart-count cart-count-plus'
								onClick={() => updateItem({ id: id, type: '+', count })}
							>
								+
							</div>
						</div>
					</div>
				</div>
				<div className='cart-items-inter'>
					<p className='cart-items-price'>{price * count} P</p>
					<button className='cart-items-del' onClick={() => deleteItem(id)}>
						Удалить
					</button>
				</div>
			</div>
		</>
	)
}
