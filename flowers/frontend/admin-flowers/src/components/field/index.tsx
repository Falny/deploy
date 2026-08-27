import React from 'react'
import './style.scss'

type FilesProps = {
	title: string
	field: number | string
	toggle: boolean
	handleChangeElement: (e: string) => void
	toggleField: boolean
	setToggleField: React.Dispatch<
		React.SetStateAction<{ name: boolean; price: boolean; oldPrice: boolean }>
	>
	name: string
	checkNum?: string | undefined
}

export const Filed = ({
	title,
	field,
	toggle,
	handleChangeElement,
	toggleField,
	setToggleField,
	name,
	checkNum,
}: FilesProps) => {
	return (
		<div className='add-form-field add-form-field-select'>
			<p className='form-text'>{title}:</p>
			<div className='field-container'>
				<input
					type='text'
					name={name}
					className='form-field'
					value={field}
					onChange={
						toggleField ? e => handleChangeElement(e.target.value) : undefined
					}
					readOnly={!toggleField}
				/>
				<span
					className={`error ${checkNum && 'error-active error-edit-active'}`}
				>
					{checkNum}
				</span>
				{toggle && (
					<button
						className='edit-btn'
						onClick={() =>
							setToggleField(prev => ({
								...prev,
								[name]: !toggleField,
							}))
						}
					>
						{toggleField ? 'Сохранить' : 'Изменить'}
					</button>
				)}
			</div>
		</div>
	)
}
