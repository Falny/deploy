import React from 'react'
import './style.scss'
import { Filed } from '../field'
import { EditFiledArray } from '../editFiledArray'
import {
	editAddStructure,
	editDeleteStructure,
	editNewGood,
	editOldPrice,
	editPrice,
	editSale,
	editName,
	editAddFormat,
	editDeleteFormat,
	editAddLight,
	editDeleteLight,
	editAddColor,
	editDeleteColor,
	editAddCategory,
	editDeleteCategory,
	editImg,
	editImgArchive,
	editDeleteImgArchiveItem,
} from '../../redux/slice/editProductSlice'
import { useProductHook } from '../../hook/useEditProduct'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import convertImg from '../convert/convertImg'

export const InsideProduct = () => {
	const dispatch = useDispatch<AppDispatch>()

	const {
		item_,
		toggleEdit,
		toggleEditField,
		setToggleEditField,
		toggleEditArray,
		setToggleEditArray,
		structure,
		format,
		light,
		color,
		category,
		handleUpdateData,
	} = useProductHook()

	const { imgConvert, imgConvertArchive } = convertImg()

	const convert = async (img: File | undefined) => {
		imgConvert(img, editImg)
	}

	const convertArchive = async (images: FileList | null) => {
		imgConvertArchive(images, editImgArchive)
	}

	return (
		<>
			<div className='common-container'>
				<div className='header-product'>
					<h3 className='title'>Карточка товара</h3>
					<button className='edit-btn' onClick={() => handleUpdateData()}>
						{toggleEdit ? 'Сохранить' : 'Редактировать'}
					</button>
				</div>
				<div className='item-container'>
					<div className='item-left'>
						<img src={item_.mainImg} alt='' className='item-img' />
						{toggleEdit && (
							<input type='file' onChange={e => convert(e.target.files?.[0])} />
						)}
					</div>

					<div className='item-right'>
						<Filed
							title={'Название'}
							field={item_.name}
							toggle={toggleEdit}
							handleChangeElement={(text: string) => dispatch(editName(text))}
							toggleField={toggleEditField.name}
							setToggleField={setToggleEditField}
							name={'name'}
						/>
						<Filed
							title={'Цена'}
							field={item_.price}
							toggle={toggleEdit}
							handleChangeElement={(text: string) => dispatch(editPrice(text))}
							toggleField={toggleEditField.price}
							setToggleField={setToggleEditField}
							name={'price'}
						/>

						{(item_.oldPrice || toggleEdit) && (
							<Filed
								title={'Старая цена'}
								field={item_.oldPrice}
								toggle={toggleEdit}
								handleChangeElement={(text: string) =>
									dispatch(editOldPrice(text))
								}
								toggleField={toggleEditField.oldPrice}
								setToggleField={setToggleEditField}
								name={'oldPrice'}
							/>
						)}

						<div className='item-block'>
							<div className='item-checked'>
								<p className='form-text'>Новое</p>
								<input
									type='checkbox'
									className='item-checked'
									checked={item_.newGood}
									onChange={
										toggleEdit
											? (e: React.ChangeEvent<HTMLInputElement>) =>
													dispatch(editNewGood(e.target.checked))
											: undefined
									}
								/>
							</div>
						</div>
						<div className='item-block'>
							<div className='item-checked'>
								<p className='form-text'>Скидка</p>
								<input
									type='checkbox'
									className='item-checked'
									checked={item_.sale}
									onChange={
										toggleEdit
											? (e: React.ChangeEvent<HTMLInputElement>) =>
													dispatch(editSale(e.target.checked))
											: undefined
									}
								/>
							</div>
						</div>

						<EditFiledArray
							title={'Состав'}
							elem={item_.structure}
							toggle={toggleEdit}
							toggleField={toggleEditArray.structure}
							setToggleArray={setToggleEditArray}
							list={structure}
							item={'structure'}
							funcAddItem={text => dispatch(editAddStructure(text))}
							funcDeleteItem={text => dispatch(editDeleteStructure(text))}
						/>

						<EditFiledArray
							title={'Формат букета'}
							elem={item_.format}
							toggle={toggleEdit}
							toggleField={toggleEditArray.format}
							setToggleArray={setToggleEditArray}
							list={format}
							item={'format'}
							funcAddItem={text => dispatch(editAddFormat(text))}
							funcDeleteItem={text => dispatch(editDeleteFormat(text))}
						/>
						<EditFiledArray
							title={'Свет'}
							elem={item_.light}
							toggle={toggleEdit}
							toggleField={toggleEditArray.light}
							setToggleArray={setToggleEditArray}
							list={light}
							item={'light'}
							funcAddItem={text => dispatch(editAddLight(text))}
							funcDeleteItem={text => dispatch(editDeleteLight(text))}
						/>

						<EditFiledArray
							title={'Цвета в букете'}
							elem={item_.color}
							toggle={toggleEdit}
							toggleField={toggleEditArray.color}
							setToggleArray={setToggleEditArray}
							list={color}
							item={'color'}
							funcAddItem={text => dispatch(editAddColor(text))}
							funcDeleteItem={text => dispatch(editDeleteColor(text))}
						/>

						<EditFiledArray
							title={'Каталог'}
							elem={item_.category}
							toggle={toggleEdit}
							toggleField={toggleEditArray.category}
							setToggleArray={setToggleEditArray}
							list={category}
							item={'category'}
							funcAddItem={text => dispatch(editAddCategory(text))}
							funcDeleteItem={text => dispatch(editDeleteCategory(text))}
						/>

						<div className='item-block'>
							<p className='form-text'>Изображения</p>
							<ul className='item-imgs'>
								{item_.images.map((elem, index) => (
									<li className='item-imgs_item'>
										<img key={index} src={elem} className='item-archive' />
										{toggleEdit && (
											<span
												className='item_delete-img'
												onClick={() =>
													dispatch(editDeleteImgArchiveItem(index))
												}
											></span>
										)}
									</li>
								))}
								{toggleEdit && (
									<input
										type='file'
										onChange={e => convertArchive(e.target.files)}
									/>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
