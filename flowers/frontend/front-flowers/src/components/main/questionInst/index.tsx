import './style.scss'

import SignatureGreen from '../../../assets/main/questionInst/signatura-green.png'
import Img1 from '../../../assets/main/questionInst/img-inst1.png'
import Img2 from '../../../assets/main/questionInst/img-inst2.png'
import Img3 from '../../../assets/main/questionInst/img-inst3.png'
import Img4 from '../../../assets/main/questionInst/img-inst4.png'

import SignatureFromInst from '../../../assets/main/questionInst/signatura-inst.png'

import InstIcon from '../../../assets/infoOrder/inst.svg'
import Vaiber from '../../../assets/infoOrder/viber.svg'
import Call from '../../../assets/common/call.svg'

const images = [Img1, Img2, Img3, Img4]

export const QuestionInst = () => {
	return (
		<>
			<div className='question-inst'>
				<div className='qi_back-img'></div>
				<div className='container'>
					<div className='qi-block'>
						<div className='qi-top'>
							<div className='qi-title'>
								<h3 className='title'>остались</h3>
								<h3 className='title qi-title-second'>вопросы?</h3>
							</div>
							<div className='qi_block-text'>
								<span className='qi-stick'></span>
								<div className='qi-text'>
									Отправьте ваш вопрос, заказ, предложение или жалобу через
									форму обратной связи, и наш специалист свяжется с вами в
									течение 15 минут.
								</div>
							</div>
							<div className='light-pink qi-pink'></div>
							<div className='mini-light-green qi-green'></div>
						</div>

						<img src={SignatureGreen} alt='' className='qi-signatura' />
						<div className='qi_block-form'>
							<form action='' className='qi-form'>
								<input
									type='name'
									className='qi-input qi-name'
									placeholder='Ваше имя'
								/>
								<input
									type='email'
									className='qi-input qi-email'
									placeholder='+7 (977) 777-77-77'
								/>
								<textarea
									className='qi-input qi-comment'
									placeholder='Ваш комментарий'
								/>
								<button className='qi-btn'>отправить</button>
								<p className='qi-policy'>
									Нажимая на кнопку «Отправить», я даю свое согласие на
									обработку персональных данных, в соответствии с{' '}
									<a href='#' className='qi-policy-link'>
										Политикой конфиденциальности
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='block-inst'>
				<p className='bi-text-inst'>instagram</p>
				<div className='mini-light-pink inst-pink'></div>
				<div className='mini-light-green inst-green'></div>
				<div className='mini-light-green inst-green-last'></div>
				<div className='container'>
					<div className='block-inst_common'>
						<div className='bi-images'>
							{images.map((src, index) => (
								<img src={src} alt='img' key={index} className='bi-img' />
							))}
						</div>
						<div className='bi_signatura-stick'>
							<span className='bi-stick'></span>
							<img src={SignatureFromInst} alt='' className='bi-signatura' />
						</div>
						<div className='bi_social-net'>
							<img src={InstIcon} alt='' className='bi-icon bi-inst' />
							<img src={Vaiber} alt='' className='bi-icon bi-viber' />
							<img src={Call} alt='' className='bi-icon bi-call' />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
