import React from 'react'
import './style.scss'

import Social900 from '../../assets/Contact/social900.png'
import Social600 from '../../assets/Contact/social600.png'
import Social400 from '../../assets/Contact/social400.png'
import Social200 from '../../assets/Contact/social900.png'
import Tg from '../../assets/Contact/tg.png'
import Tg900 from '../../assets/Contact/tg900.png'
import Watsap from '../../assets/Contact/watsap.png'
import Watsap900 from '../../assets/Contact/watsap900.png'
import Detect from '../../assets/Contact/detect.png'
import Detect800 from '../../assets/Contact/detect800.png'

import useMotion from '../../Hook/useMotion'

export default function Contact({
	refContact,
}: {
	refContact: React.RefObject<null>
}) {
	const [heightTextArea, setHeightTextarea] = React.useState(50)
	// const [agreement, setAgreement] = React.useState()
	const [name, setName] = React.useState('')
	const [tel, setTel] = React.useState('')
	const [text, setText] = React.useState('')
	const [errorOrAccept, setErrorOrAccept] = React.useState('')
	// const [isVisible, setIsVisible] = React.useState(false)
	const ref = React.useRef<HTMLDivElement>(null)

	const isVisible = useMotion({ ref })

	const changeTextarea = (
		e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
	) => {
		setText(e.target.value)
		if (e.target.value.length < 50) {
			setHeightTextarea(50)
			return
		}
		setHeightTextarea(e.target.scrollHeight)
	}

	const handlerChangeTel = (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		let checkTel = e.target.value
		if (/^[0-9\s]*$/.test(checkTel)) {
			setTel(e.target.value)
		} else {
			setErrorOrAccept('Должны быть только цифры')
			setTimeout(() => setErrorOrAccept(''), 1500)
		}
	}

	const handlerForm = async () => {
		try {
			if (name.length === 0) {
				setErrorOrAccept('Введите имя')
				setTimeout(() => setErrorOrAccept(''), 1500)
				return
			}

			const stringSend = `Имя: ${name}. \n Телефон: ${tel}. \n Что хочу: ${text}.`
			const request = await fetch('/portfolio-api/form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(stringSend),
			})

			const response = await request.json()

			if (response.message) {
				setErrorOrAccept(response.text)
				setTimeout(() => setErrorOrAccept(''), 1500)
				setName('')
				setTel('')
				setText('')
			} else {
				setErrorOrAccept(response.text)
				setTimeout(() => setErrorOrAccept(''), 1500)
			}
		} catch (error) {
			setErrorOrAccept('Произошла непредвиденная ошибка')
			setTimeout(() => setErrorOrAccept(''), 1500)
		}
	}

	return (
		<section
			className={`contact ${isVisible ? 'contact-active' : ''}`}
			ref={ref}
		>
			<div className='container'>
				<div className='contact-block_social' ref={refContact}>
					<picture
						className='contact-item_left'
						style={{ '--order': 1 } as React.CSSProperties}
					>
						<source srcSet={Social200} media='(max-width: 400px)' />
						<source srcSet={Social400} media='(max-width: 720px)' />
						<source srcSet={Social600} media='(max-width: 1200px)' />
						<img
							srcSet={Social900}
							alt='text'
							className='contact_img-main'
							loading='lazy'
							width={920}
							height={260}
						/>
					</picture>
					<div className='contact-social_icons'>
						<div
							className='contact_social contact-item'
							style={{ '--order': 2 } as React.CSSProperties}
						>
							<p className='contact-social_text size'>Телеграмм</p>

							<a href='https://t.me/gaaaab37' target='_blank'>
								<picture>
									<source srcSet={Tg900} media='(max-width: 900px)' />
									<img
										srcSet={Tg}
										alt='telegram'
										className='contact-social_img'
										loading='lazy'
										width={210}
										height={200}
									/>
								</picture>
							</a>
						</div>
						<div
							className='contact_social contact-item'
							style={{ '--order': 3 } as React.CSSProperties}
						>
							<p className='contact-social_text size'>WhatsApp</p>
							<a href='https://wa.me/79960542001' target='_blank' className=''>
								<picture>
									<source srcSet={Watsap900} media='(max-width: 900px)' />
									<img
										srcSet={Watsap}
										alt='whatsapp'
										className='contact-social_img'
										loading='lazy'
										width={210}
										height={200}
									/>
								</picture>
							</a>
						</div>
					</div>
				</div>
				<div className='contact-block'>
					<picture
						className='contact-item'
						style={{ '--order': 4 } as React.CSSProperties}
					>
						<source srcSet={Detect800} media='(max-width: 900px)' />
						<img
							srcSet={Detect}
							alt='picture'
							className='contact-img'
							loading='lazy'
							width={400}
							height={600}
						/>
					</picture>
					<span className='back contact-back'></span>
					<div className='contact-block_form'>
						<p className='contact-form_title text-size_p'>Свяжитесь со мной</p>
						<form action='POST' className='form'>
							<label className='contact-form_label'>
								<input
									type='text'
									className='contact-form_input size'
									placeholder='Имя..'
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</label>
							<label className='contact-form_label'>
								<input
									type='tel'
									className='contact-form_input size'
									placeholder='Номер телефона..'
									value={tel}
									onChange={e => handlerChangeTel(e)}
								/>
							</label>
							<label className='contact-form_label'>
								<textarea
									name=''
									style={{
										height:
											heightTextArea < 340 ? heightTextArea + 'px' : '340px',
										overflowY: heightTextArea > 340 ? 'scroll' : 'hidden',
									}}
									onChange={e => changeTextarea(e)}
									className='contact-form_area size'
									placeholder='Опишите, что бы вы хотели сделать'
									value={text}
								></textarea>
							</label>
						</form>
						<button className='btn-contact size' onClick={() => handlerForm()}>
							Отправить
						</button>
					</div>
				</div>
				<span
					className={`${errorOrAccept.length > 0 ? 'error-or-accept size' : 'error-or-accept_close'}`}
				>
					{errorOrAccept}
				</span>
			</div>
		</section>
	)
}
