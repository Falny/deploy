import React from 'react'
import { useParams } from 'react-router-dom'
import type { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
	FetchGetProduct,
	FetchPatchProduct,
} from '../redux/slice/editProductSlice'

export const useProductHook = () => {
	const { id } = useParams()
	const item_ = useSelector((state: RootState) => state.edit)

	const [toggleEdit, setToggleEdit] = React.useState(false)

	const [toggleEditField, setToggleEditField] = React.useState({
		name: false,
		price: false,
		oldPrice: false,
	})

	const [toggleEditArray, setToggleEditArray] = React.useState({
		structure: false,
		format: false,
		color: false,
		category: false,
		light: false,
	})

	const structure = useSelector((state: RootState) => state.structure.structure)
	const format = useSelector((state: RootState) => state.format.format)
	const light = useSelector((state: RootState) => state.light.light)
	const color = useSelector((state: RootState) => state.color.color)
	const category = useSelector((state: RootState) => state.category.category)

	const dispatch = useDispatch<AppDispatch>()

	React.useEffect(() => {
		if (!id) return alert('ошибка карточки товара')
		dispatch(FetchGetProduct(id))
	}, [id])

	const handleUpdateData = () => {
		setToggleEdit(!toggleEdit)

		if (!id) {
			alert('Ошибка продукта')
			return
		}

		if (toggleEdit) {
			dispatch(
				FetchPatchProduct({
					id,
					mainImg: item_.mainImg,
					name: item_.name,
					price: item_.price,
					oldPrice: item_.oldPrice,
					sale: item_.sale,
					newGood: item_.newGood,
					images: item_.images,
					structure: item_.structure,
					format: item_.format,
					light: item_.light,
					color: item_.color,
					category: item_.category,
				}),
			)
		}
	}

	return {
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
	}
}
