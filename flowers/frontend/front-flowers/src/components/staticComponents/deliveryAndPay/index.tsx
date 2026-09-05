import './style.scss'
import { Breadcrumbs } from '../../bredcrams'
import SignaRose from '../../../assets/deliveryAndPay/rose-signa.png'

const payment = [
	'БАНКОВСКОЙ КАРТОЙ ПРИ ОФОРМЛЕНИИ ЗАКАЗА ЧЕРЕЗ САЙТ или по ссылке',
	'НАЛИЧНЫМИ,  БАНКОВСКОЙ КАРТОЙ ПРИ САМОВЫВОЗЕ или с расчетного счета орагнизации',
	'НАЛИЧНЫМИ ПРИ ДОСТАВКЕ КУРЬЕРОМ',
	'КРИПТОВАЛЮТОЙ',
]

export const DeliveryAndPay = () => {
	return (
		<>
			<div className='delivery-pay'>
				<div className='container'>
					<Breadcrumbs />
					<h3 className='title'>доставка</h3>
					<div className='title dp-title-main'>и оплата</div>
					<div className='delivery-pay_block'>
						<p className='dp-title'>Способы оплаты:</p>
						<ul className='dp-list'>
							{payment.map((text, index) => (
								<li className='dp-item' key={index}>
									<span className='dp-item-circle'></span>
									<p className='dp-text'>{text}</p>
								</li>
							))}
						</ul>
					</div>
					<div className='delivery-pay_dilevery'>
						<p className='dp-title'>стоимость доставки:</p>

						<ul className='dp-list-delivery'>
							<li className='dp-text dp-style-circle'>
								<span className='dp-bold'>Бесплатно</span> – при заказе на сумму{' '}
								<span className='dp-green'>от 90 рублей</span>
							</li>
							<li className='dp-text dp-style-circle'>
								<span className='dp-bold'>10 рублей </span>– при заказе на сумму{' '}
								<span className='dp-green'>менее 90 рублей</span>
							</li>
							<li className='dp-text dp-style-circle'>
								Так же вы можете забрать ваш заказ самостоятельно по адресу:{' '}
								<span className='dp-green'>
									г. Минск, ул. Тимирязева д. 67, комн. 112 ежедневно с 10.00 до
									21.00
								</span>
							</li>
						</ul>
					</div>
					<div className='dp-list-delivery'>
						<p className='dp-title'>Условия доставки:</p>
						<ul className='dp-list-condition'>
							<li className='dp-text dp-style-circle'>
								Доставка осуществляется по городу Минску в пределах МКАД
								<span className='dp-green'> в любой день</span>
							</li>
							<li className='dp-text dp-style-circle'>
								Возможность, сроки и стоимость доставки за пределы МКАД,
								доставки в ночное время, праздники
								<span className='dp-green'> оговариваются с менеджером</span>
							</li>
						</ul>
					</div>
					<div className='dp-dop'>
						<p className='dp-title dp-dop-title'>Дополнительно:</p>
						<p className='dp-text'>
							Доставка иному лицу возможна только в случае оплаты заказа
							заказчиком. Доставка осуществляется не ранее чем через 2 часа
							после оплаты заказа, но может быть ранее, если букет есть в
							наличии либо по договорённости с менеджером. Время ожидания
							курьера составляет 15 минут. В случае если на момент доставки
							цветов получателя нет либо нет возможности по иным причинам
							произвести доставку (указан неточный адрес, закрытая входная
							дверь, контрольно-пропускная система и др.), мы оставляем за собой
							право по собственному выбору:
							<ul className='dp-text-list'>
								<li className='dp-text-item dp-style-circle'>
									оставить цветы тому, кто открыл дверь;
								</li>
								<li className='dp-text-item dp-style-circle'>
									с заказчиком согласовать повторную доставку, которая
									дополнительно оплачивается;
								</li>
								<li className='dp-text-item dp-style-circle'>
									отказаться от передачи цветов без возврата денежных средств.
								</li>
							</ul>
						</p>
						<p className='dp-text dp-text-margin'>
							Если вы либо иной получатель не получили заказ, вам необходимо
							сообщить об этом менеджеру по телефону
							<span className='dp-green'> +375 29 113 69 69.</span>
						</p>
						<p className='dp-title dp-dop-title'>Возврат денег:</p>
						<p className='dp-text'>
							При отказе заказчика от заказа в течение двух часов, если заказ
							ещё не начал готовиться, средства возвращаются в полном объёме.
							Если же флорист начал подготовку, то заказчик имеет право на
							возврат 50% стоимости, либо, если ещё не был оплачен, то обязан
							оплатить 50%.
						</p>
						<p className='dp-text dp-text-margin'>
							Цветы надлежащего качества возврату и обмену не подлежат, а если
							имеются какие-либо недостатки в цветах – возврат производится лишь
							если эти недостатки не являются природными и естественными
							изъянами растения. Возврат денежных средств производится
							незамедлительно на тот счёт, с которого произошла оплата, их же
							поступление на счёт зависит от платёжной системы.
						</p>
					</div>
					<img src={SignaRose} alt='' className='dp-img-signa' />
				</div>
				<div className='mini-light-white dp-light-white-1'></div>
				<div className='light-white dp-light-white-2'></div>
				<div className='mini-light-white dp-light-white-3'></div>
				<div className='mini-light-white dp-light-white-4'></div>
				<div className='light-white dp-light-white-5'></div>
				<div className='light-white dp-light-white-6'></div>
				<div className='mini-light-white dp-light-white-7'></div>
				<div className='mini-light-white dp-light-white-8'></div>
			</div>
		</>
	)
}
