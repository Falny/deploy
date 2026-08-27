import { ChevronsDown, ChevronsRight, X } from 'lucide-react'
import React from 'react'
import type { Structure } from '../../redux/slice/structureSlice'
import type { Format } from '../../redux/slice/formatSlice'
import type { Color } from '../../redux/slice/colorSlice'
import type { Category } from '../../redux/slice/categorySlice'
import type { Light } from '../../redux/slice/lightSlice'

type EditFiledArrayProps = {
	title: string
	elem: string[]
	toggleField: boolean
	toggle: boolean
	setToggleArray: React.Dispatch<
		React.SetStateAction<{
			structure: boolean
			format: boolean
			color: boolean
			category: boolean
			light: boolean
		}>
	>
	list: Structure[] | Format[] | Color[] | Category[] | Light[]
	item: 'structure' | 'format' | 'color' | 'category' | 'light'
	funcAddItem: (id: string) => void
	funcDeleteItem: (text: string) => void
}

export const EditFiledArray = ({
	title,
	elem,
	toggleField,
	setToggleArray,
	toggle,
	list,
	item,
	funcAddItem,
	funcDeleteItem,
}: EditFiledArrayProps) => {
	return (
		<>
			{toggle ? (
				<div className='add-form-field add-form-field-select'>
					<span className='form-text'>{title}</span>
					<div className='form-field form-field-select'>
						<p className='form-selected'>
							{elem &&
								elem.map((el, index) => (
									<span className='form-text-select' key={index}>
										{el}
										<X
											className='delete-icon'
											onClick={() => funcDeleteItem(el)}
										/>
									</span>
								))}
						</p>

						{toggleField ? (
							<ChevronsDown
								className='arrow'
								onClick={() =>
									setToggleArray(prev => ({ ...prev, [item]: !toggleField }))
								}
							/>
						) : (
							<ChevronsRight
								className='arrow'
								onClick={() =>
									setToggleArray(prev => ({ ...prev, [item]: !toggleField }))
								}
							/>
						)}
					</div>

					<ul className={`form-select ${toggleField && 'form-select-active'}`}>
						{list.map(el => (
							<li
								className='form-select-item'
								key={el.id}
								onClick={() => funcAddItem((el as any)[item])}
							>
								{(el as any)[item]}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className='add-form-field add-form-field-select'>
					<p className='form-text'>{title}:</p>
					<div className='field-container'>
						<input type='text' className='form-field' value={elem} readOnly />
					</div>
				</div>
			)}
		</>
	)
}
