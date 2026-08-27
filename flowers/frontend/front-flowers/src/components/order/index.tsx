import './style.scss'

import PinkSigna from '../../assets/common/rose_signature.png'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { CartItems } from '../cartItems'
import { resultSum } from '../../hook/resultCart'
import { Breadcrumbs } from '../bredcrams'

export const Order = () => {
	const cart = useSelector((state: RootState) => state.carts.items)

	const { totalSum } = resultSum()

	return (
		<>
			<div className='order'>
				<div className='container'>
					<Breadcrumbs />
					<div className='order-title'>
						<h3 className='title'>оформление</h3>
						<h3 className='title order-title-two'>заказа</h3>
						<img src={PinkSigna} alt='' className='order-pink-signa' />
						<div className='light-pink order-light-pink'></div>
						<div className='mini-light-green order-light-green'></div>
					</div>
					<div className='order-container'>
						<div className='order-the-order'>
							<p className='oto-title'>Оформление заказа</p>
							<p className='order-title-exceprion'>Контактные данные</p>
							<form action='' className='order-form'>
								<label htmlFor='name' className='order-label'>
									Ваше имя*
									<input
										id='name'
										type='text'
										name='name'
										className='order-input'
										required
										placeholder='Введите ваше имя'
									/>
								</label>
								<label htmlFor='tel' className='order-label'>
									Ваш телефон*
									<input
										id='tel'
										type='tel'
										name='tel'
										className='order-input'
										required
										placeholder='+7 (977) 777-77-77'
									/>
								</label>
								<label htmlFor='email' className='order-label'>
									Ваш e-mail*
									<input
										id='email'
										name='email'
										type='email'
										className='order-input'
										required
										placeholder='Введите вашу почту'
									/>
								</label>
								<label htmlFor='telRecipient' className='order-label'>
									Телефон получателя (необязательно)
									<input
										id='telRecipient'
										name='telRecipient'
										type='tel'
										className='order-input'
										placeholder='+7 (977) 777-77-77'
									/>
								</label>
								<label htmlFor='nameRecipient' className='order-label'>
									Имя получателя (необязательно)
									<input
										id='nameRecipient'
										name='nameRecipient'
										type='text'
										className='order-input'
										placeholder='Введите имя получателя'
									/>
								</label>
								<label htmlFor='comment' className='order-label'>
									Комментарий к заказу
									<input
										id='comment'
										name='comment'
										type='text'
										className='order-input'
										placeholder='Примечания к вашеу заказу,  особые пожелания отделу доставки'
									/>
								</label>
								<p className='order-title'>Доставка</p>
								<label htmlFor='self-deliv' className='order-radio-option'>
									<input
										id='self-deliv'
										name='delivery'
										type='radio'
										className='order-radio'
									/>
									Самовывоз
								</label>
								<label htmlFor='deliv' className='order-radio-option'>
									<input
										id='deliv'
										name='delivery'
										type='radio'
										className='order-radio'
									/>
									Доставка курьером
								</label>
								<label htmlFor='city' className='order-label'>
									Город*
									<input
										id='city'
										name='city'
										type='text'
										className='order-input'
										required
										placeholder='Выберите город'
									/>
								</label>
								<label htmlFor='street' className='order-label'>
									Улица*
									<input
										id='street'
										name='street'
										type='text'
										className='order-input'
										required
										placeholder='Введите улицу'
									/>
								</label>
								<div className='order-info'>
									<label htmlFor='corp' className='order-label'>
										Корп/стр
										<input
											id='corp'
											name='corp'
											type='text'
											className='order-short-input order-input'
											placeholder='Корп/стр'
										/>
									</label>
									<label htmlFor='house' className='order-label'>
										Дом
										<input
											id='house'
											name='house'
											type='text'
											className='order-short-input order-input'
											placeholder='Дом'
										/>
									</label>
									<label htmlFor='apartmen' className='order-label'>
										Кв/офис
										<input
											id='apartmen'
											name='apartmen'
											type='text'
											className='order-short-input order-input'
											placeholder='Кв/офис'
										/>
									</label>
									<label htmlFor='time' className='order-label'>
										Время доставки
										<input
											id='time'
											name='time'
											type='time'
											className='order-short-input order-input'
											placeholder='__/__'
										/>
									</label>
								</div>
								<p className='order-title'>оплата</p>
								<div className='order-radio-container'>
									<label htmlFor='payd' className='order-radio-option'>
										<input
											id='payd'
											name='payd'
											type='radio'
											className='order-radio'
										/>
										Банковская карта
									</label>
									<label htmlFor='payd' className='order-radio-option'>
										<input
											id='payd'
											name='payd'
											type='radio'
											className='order-radio'
										/>
										Наличными
									</label>
									<label htmlFor='payd' className='order-radio-option'>
										<input
											id='payd'
											name='payd'
											type='radio'
											className='order-radio'
										/>
										Apple pay
									</label>
									<label htmlFor='payd' className='order-radio-option'>
										<input
											id='payd'
											name='payd'
											type='radio'
											className='order-radio'
										/>
										Google pay
									</label>
									<label htmlFor='payd' className='order-radio-option'>
										<input
											id='payd'
											name='payd'
											type='radio'
											className='order-radio'
										/>
										Криптовалюта
									</label>
									<label htmlFor='payd' className='order-radio-option'>
										<input
											id='payd'
											name='payd'
											type='radio'
											className='order-radio'
										/>
										С расчетного счета
									</label>
								</div>
								<p className='order-title'>Промокод</p>
								<div className='order-form-promo-container'>
									<label htmlFor='promo' className='order-label'>
										<input
											id='promo'
											name='promo'
											type='text'
											className='order-input order-form-promo'
											placeholder='Промокод'
										/>
									</label>
									<button className='order-btn-promo'>Применить</button>
								</div>
								<div className='order-common-sum'>
									<div className='oto-title oc-sum'>
										<p className='oc-sum_text'>Общая сумма заказа</p>
										{/* <p className="oc-sum_sum">{totalSum} ₽</p> */}
									</div>
									<div className='oc-dilivery-discont'>
										<p className='oc-discont'>Скидка = 0 ₽</p>
										<p className='oc-dilevery'>Доставка = 0 ₽</p>
									</div>

									<div className='oc-btn-policy'>
										<button className='oc-btn'>К оплате</button>
										<p className='oc-policy'>
											Нажимая на кнопку «К Оплате», я даю свое согласие на
											обработку персональных данных, в соответствии с{' '}
											<a href='#' className='oc-policy-link'>
												Политикой конфиденциальности
											</a>
											, а так же ознакомлен с условиями оплаты и доставки
										</p>
									</div>
								</div>
							</form>
						</div>
						<div className='order-cart-block'>
							{cart.length ? (
								cart.map(el => (
									<div key={el.id} className='order-cart'>
										<CartItems {...el} />
									</div>
								))
							) : (
								<p className='cart-empty'>
									Корзина пуста.
									<br /> Добавьте товары.
								</p>
							)}
							{cart.length > 0 && (
								<div className='cart-result'>
									<p className='result'>Итог:</p>
									<span className='result-total'>{totalSum} Р.</span>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='light-pink order-light-pink-center'></div>
				<div className='mini-light-green order-light-green-center'></div>
				<div className='light-pink order-light-pink-bottom'></div>
				<div className='mini-light-green order-light-green-bottom'></div>
				<div className='mini-light-green order-light-green-bottom-end'></div>
			</div>
		</>
	)
}
