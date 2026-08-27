import './style.scss'
import { FieldArray } from '../fieldArray/index'
import {
	useAddProductHook,
	useCategoryHook,
	useColorHook,
	useFormatHook,
	useLightHook,
	useStructureHook,
} from '../../hook/addProductHook'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import {
	deleteCategory,
	deleteColor,
	deleteFormat,
	deleteLight,
	deleteStructure,
	setCategory,
	setColor,
	setFormat,
	setLight,
	setNew,
	setOldPrice,
	setPrice,
	setSale,
	setStructure,
	setTitle,
	setImg,
	setImgArchive,
} from '../../redux/slice/formSlice'

import convertImg from '../convert/convertImg'

export const AddProduct = React.memo(() => {
	const form_ = useSelector((state: RootState) => state.form.values)
	const error_ = useSelector((state: RootState) => state.form.errors)
	const dispatch = useDispatch<AppDispatch>()

	const { handleSubmitForm } = useAddProductHook()

	const { toggleCategory, setToggleCategory, category, checkRefCategory } =
		useCategoryHook()
	const { toggleStructure, setToggleStructure, checkStructureRef, structure } =
		useStructureHook()
	const { toggleFormat, setToggleFormat, format, checkFormatRef } =
		useFormatHook()
	const { setToggleLight, toggleLight, light, checkLightRef } = useLightHook()
	const { toggleColor, setToggleColor, color, checkColorRef } = useColorHook()
	const { imgConvert, imgConvertArchive } = convertImg()

	const convert = async (img: File | undefined) => {
		imgConvert(img, setImg)
	}

	const convertArchive = async (images: FileList | null) => {
		imgConvertArchive(images, setImgArchive)
	}

	return (
		<div className='common-container'>
			<div className='title'>Добавление товара</div>
			<form
				method='POST'
				encType='multipart/form-data'
				className='add-form'
				onSubmit={e => handleSubmitForm(e)}
			>
				<label htmlFor='img' className='add-form-field img-form'>
					<span className='form-text'>изображение</span>
					<input
						name='img'
						type='file'
						className='form-field-file'
						onChange={e => convert(e.target.files?.[0])}
						accept='image/jpeg, image/png'
					/>
				</label>
				<label htmlFor='title' className='add-form-field'>
					<span className='form-text'>Название</span>
					<input
						name='title'
						value={form_.title}
						onChange={e => dispatch(setTitle(e.target.value))}
						type='text'
						className='form-field'
					/>
				</label>
				<label htmlFor='price' className='add-form-field'>
					<span className='form-text'>Цена</span>
					<input
						name='price'
						value={form_.price}
						onChange={e => dispatch(setPrice(e.target.value))}
						type='text'
						className='form-field'
					/>
					<span className={`error ${error_.price && 'error-active'}`}>
						{error_.price}
					</span>
				</label>
				<label htmlFor='oldPrice' className='add-form-field'>
					<span className='form-text'>старая Цена</span>
					<input
						name='oldPrice'
						value={form_.oldPrice}
						onChange={e => dispatch(setOldPrice(e.target.value))}
						type='text'
						className='form-field'
					/>
					<span className={`error ${error_.oldPrice && 'error-active'}`}>
						{error_.oldPrice}
					</span>
				</label>
				<label htmlFor='sale' className='label-checkbox'>
					<span className='form-text'>Скидка</span>
					<input
						name='sale'
						checked={form_.sale}
						onChange={e => dispatch(setSale(e.target.checked))}
						type='checkbox'
						className='field-checkbox'
					/>
				</label>
				<label htmlFor='new' className='label-checkbox'>
					<span className='form-text'>Новое</span>
					<input
						name='new'
						checked={form_.new}
						onChange={e => dispatch(setNew(e.target.checked))}
						type='checkbox'
						className='field-checkbox'
					/>
				</label>
				<FieldArray
					title={'Состав'}
					form={form_.structure}
					funcDelete={text => dispatch(deleteStructure(text))}
					toggle={toggleStructure}
					stateToggle={setToggleStructure}
					funcSetItem={text => dispatch(setStructure(text))}
					ref={checkStructureRef}
					list={structure}
					item={'structure'}
				/>
				<FieldArray
					title={'Формат'}
					form={form_.format}
					funcDelete={text => dispatch(deleteFormat(text))}
					toggle={toggleFormat}
					stateToggle={setToggleFormat}
					funcSetItem={text => dispatch(setFormat(text))}
					ref={checkFormatRef}
					list={format}
					item={'format'}
				/>

				<label htmlFor='imgArchive' className='add-form-field '>
					<span className='form-text'>Изображения для карусели</span>
					<input
						name='imgArchive'
						type='file'
						className='form-field-file'
						multiple
						onChange={e => convertArchive(e.target.files)}
						accept='image/jpeg, image/png'
					/>
				</label>

				<FieldArray
					title={'Цвета в букете'}
					form={form_.color}
					funcDelete={text => dispatch(deleteColor(text))}
					toggle={toggleColor}
					stateToggle={setToggleColor}
					funcSetItem={text => dispatch(setColor(text))}
					ref={checkColorRef}
					list={color}
					item={'color'}
				/>

				<FieldArray
					title={'Свет'}
					form={form_.light}
					funcDelete={text => dispatch(deleteLight(text))}
					toggle={toggleLight}
					stateToggle={setToggleLight}
					funcSetItem={text => dispatch(setLight(text))}
					ref={checkLightRef}
					list={light}
					item={'light'}
				/>

				<FieldArray
					title={'Каталог'}
					form={form_.category}
					funcDelete={text => dispatch(deleteCategory(text))}
					toggle={toggleCategory}
					stateToggle={setToggleCategory}
					funcSetItem={text => dispatch(setCategory(text))}
					ref={checkRefCategory}
					list={category}
					item={'category'}
				/>

				<button type='submit' className='form-btn'>
					Отправить
				</button>
			</form>
		</div>
	)
})
