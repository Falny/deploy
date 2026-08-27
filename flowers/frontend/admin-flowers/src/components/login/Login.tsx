import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import {
	setPassword,
	fetchCheckPassword,
} from '../../redux/slice/passwordSlice'

export default function Login() {
	const dispatch = useDispatch<AppDispatch>()
	const password = useSelector((state: RootState) => state.password.password)

	const handleLogin = () => {
		dispatch(fetchCheckPassword(password))
	}

	return (
		<div className='login'>
			<div className='common-container'>
				<div className='login-section'>
					<p className='login-section_title'>Вход</p>
					<div className='login-select_block'>
						<input
							type='password'
							className='form-field login-select_input'
							placeholder='Введите пароль'
							value={password}
							onChange={e => dispatch(setPassword(e.target.value))}
						/>
						<button
							className='form-btn login-select_btn'
							onClick={() => handleLogin()}
						>
							Отправить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
// Cu68!pOr
