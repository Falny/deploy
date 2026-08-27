import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchPostAdmin } from '../redux/slice/adminSlice'
import type { AppDispatch, RootState } from '../redux/store'
import { updateData } from '../redux/slice/formSlice'

export const useCategoryHook = () => {
	const [toggleCategory, setToggleCategory] = React.useState(false)
	const category = useSelector((state: RootState) => state.category.category)
	const checkRefCategory = React.useRef<HTMLUListElement>(null)

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				checkRefCategory.current &&
				!checkRefCategory.current.contains(e.target as Node)
			) {
				setToggleCategory(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [checkRefCategory])

	return {
		toggleCategory,
		setToggleCategory,
		category,
		checkRefCategory,
	}
}

export const useColorHook = () => {
	const [toggleColor, setToggleColor] = React.useState(false)
	const checkColorRef = React.useRef<HTMLUListElement>(null)
	const color = useSelector((state: RootState) => state.color.color)

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				checkColorRef.current &&
				!checkColorRef.current.contains(e.target as Node)
			) {
				setToggleColor(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [checkColorRef])

	return {
		toggleColor,
		setToggleColor,
		color,
		checkColorRef,
	}
}

export const useStructureHook = () => {
	const [toggleStructure, setToggleStructure] = React.useState(false)
	const checkStructureRef = React.useRef<HTMLUListElement>(null)
	const structure = useSelector((state: RootState) => state.structure.structure)

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				checkStructureRef.current &&
				!checkStructureRef.current.contains(e.target as Node)
			) {
				setToggleStructure(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [checkStructureRef])

	return {
		toggleStructure,
		setToggleStructure,
		checkStructureRef,
		structure,
	}
}

export const useFormatHook = () => {
	const [toggleFormat, setToggleFormat] = React.useState(false)
	const checkFormatRef = React.useRef<HTMLUListElement>(null)
	const format = useSelector((state: RootState) => state.format.format)

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				checkFormatRef.current &&
				!checkFormatRef.current.contains(e.target as Node)
			) {
				setToggleFormat(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [checkFormatRef])

	return {
		toggleFormat,
		setToggleFormat,
		format,
		checkFormatRef,
	}
}

export const useLightHook = () => {
	const [toggleLight, setToggleLight] = React.useState(false)
	const checkLightRef = React.useRef<HTMLUListElement>(null)
	const light = useSelector((state: RootState) => state.light.light)

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				checkLightRef.current &&
				!checkLightRef.current.contains(e.target as Node)
			) {
				setToggleLight(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [checkLightRef])

	return {
		setToggleLight,
		toggleLight,
		light,
		checkLightRef,
	}
}

export const useAddProductHook = () => {
	const form_ = useSelector((state: RootState) => state.form.values)

	const dispatch = useDispatch<AppDispatch>()

	const handleSubmitForm = async (e: { preventDefault: () => void }) => {
		try {
			e.preventDefault()
			const data = {
				mainImg: form_.imgMain,
				name: form_.title,
				price: Number(form_.price),
				oldPrice: Number(form_.oldPrice),
				sale: form_.sale,
				newGood: form_.new,
				images: form_.images,
				category: form_.category,
				light: form_.light,
				color: form_.color,
				format: form_.format,
				structure: form_.structure,
			}
			await dispatch(FetchPostAdmin(data))

			dispatch(updateData())
		} catch (err) {
			console.log(err)
		}
	}

	return {
		handleSubmitForm,
	}
}
