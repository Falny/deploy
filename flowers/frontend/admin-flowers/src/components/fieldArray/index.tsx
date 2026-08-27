import React from 'react'
import './style.scss'
import { ChevronsDown, ChevronsRight, X } from 'lucide-react'
import type { Structure } from '../../redux/slice/structureSlice'
import type { Format } from '../../redux/slice/formatSlice'
import type { Color } from '../../redux/slice/colorSlice'
import type { Light } from '../../redux/slice/lightSlice'
import type { Category } from '../../redux/slice/categorySlice'

type FieldArrayProps = {
	title: string
	form: string[]
	funcDelete: (text: string) => void
	toggle: boolean
	stateToggle: React.Dispatch<React.SetStateAction<boolean>>
	funcSetItem: (text: string) => void
	list: Structure[] | Format[] | Color[] | Light[] | Category[]
	item: 'structure' | 'format' | 'color' | 'light' | 'category'
}

export const FieldArray = React.forwardRef<HTMLUListElement, FieldArrayProps>(
	(
		{ title, form, funcDelete, toggle, stateToggle, funcSetItem, list, item },
		ref,
	) => {
		return (
			<div className='add-form-field add-form-field-select'>
				<span className='form-text'>{title}</span>
				<div className='form-field form-field-select'>
					<p className='form-selected'>
						{form.map((el, index) => (
							<span className='form-text-select' key={index}>
								{el}
								<X className='delete-icon' onClick={() => funcDelete(el)} />
							</span>
						))}
					</p>

					{toggle ? (
						<ChevronsDown
							className='arrow'
							onClick={() => stateToggle(!toggle)}
						/>
					) : (
						<ChevronsRight
							className='arrow'
							onClick={() => stateToggle(!toggle)}
						/>
					)}
				</div>
				<ul
					className={`form-select ${toggle && 'form-select-active'}`}
					ref={ref}
				>
					{list.map(el => (
						<li
							className='form-select-item'
							key={el.id}
							onClick={() => funcSetItem((el as any)[item])}
						>
							{(el as any)[item]}
						</li>
					))}
				</ul>
			</div>
		)
	},
)
