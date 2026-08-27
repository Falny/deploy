import './style.scss'

export default function ForgotPassword() {
	return (
		<div className='common-form-log'>
			<form action='POST' className='common-form-form login-form'>
				<div className='common-form-block login-form_block'>
					<input
						type='text'
						className='common-form-input login-form-input'
						placeholder='Почта'
					/>
				</div>
			</form>
			<button className='common-form-btn'>Отправить</button>
		</div>
	)
}
