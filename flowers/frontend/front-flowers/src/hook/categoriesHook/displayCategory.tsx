import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import type { AppDispatch } from '../../redux/store'
import { setCategory } from '../../redux/slices/filterSlice'
import { categories } from '../SELECTORS/selectors'

export const DisplayCategory = () => {
	const categoryArray = useSelector(categories)
	const category = categoryArray.map(el => el.category).flat() // мне возващется объект с массивами я их переделываю в одинарный массив
	const dispatch = useDispatch<AppDispatch>()

	const sendCategories = async (activeBtn: number[]) => {
		await dispatch(setCategory(activeBtn.map(index => category[index])))
	}

	return { sendCategories, category }
}
