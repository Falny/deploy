import React from 'react'
import './style.scss'

type WarningProp = {
	text: string | undefined
	status: string | undefined
}

export default function Warning({ text, status }: WarningProp) {
	const [toggleClose, setToggleClose] = React.useState(true)

	return (
		<div
			className={`warning ${toggleClose ? 'active' : 'inactive'}`}
			style={
				status === 'ERROR'
					? { backgroundColor: '#8f0b149d' }
					: { backgroundColor: '#8EB69B' }
			}
		>
			<p className='warning-text'>{text}</p>
			<div
				className='warning-close_block'
				onClick={() => setToggleClose(!toggleClose)}
			>
				<span className='warning-close'></span>
				<span className='warning-close'></span>
			</div>
		</div>
	)
}
