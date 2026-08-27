import React from 'react'
import type { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import {
	setLight,
	setColor,
	setStructure,
	setFormat,
} from '../../redux/slices/filterSlice'
import { useDispatch } from 'react-redux'

export const SortHook = () => {
	const dispatch = useDispatch()
	const light = useSelector((state: RootState) => state.sorts.light)
	const color = useSelector((state: RootState) => state.sorts.color)
	const format = useSelector((state: RootState) => state.sorts.format)
	const structure = useSelector((state: RootState) => state.sorts.structure)

	const [checkedLight, setCheckedLight] = React.useState<string[]>([])
	const [checkedColor, setCheckedColor] = React.useState<string[]>([])
	const [checkedFormat, setCheckedFormat] = React.useState<string[]>([])
	const [checkedFlowers, setCheckedFlowers] = React.useState<string[]>([])

	const onClickReset = () => {
		setCheckedLight([])
		setCheckedColor([])
		setCheckedFormat([])
		setCheckedFlowers([])
	}

	const onClickCheckedLight = (index: string) => {
		setCheckedLight(prev =>
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
		)
	}

	const onClickCheckedColor = (index: string) => {
		setCheckedColor(prev =>
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
		)
	}

	const onClickCheckedFormat = (index: string) => {
		setCheckedFormat(prev =>
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
		)
	}

	const onClickCheckedFlowers = (index: string) => {
		setCheckedFlowers(prev =>
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
		)
	}

	React.useEffect(() => {
		dispatch(setLight(checkedLight))
		dispatch(setColor(checkedColor))
		dispatch(setFormat(checkedFormat))
		dispatch(setStructure(checkedFlowers))
	}, [checkedLight, checkedColor, checkedFormat, checkedFlowers])

	return {
		onClickCheckedFlowers,
		onClickCheckedFormat,
		onClickCheckedColor,
		onClickCheckedLight,
		onClickReset,
		light,
		color,
		format,
		structure,
		checkedLight,
		checkedColor,
		checkedFormat,
		checkedFlowers,
	}
}
