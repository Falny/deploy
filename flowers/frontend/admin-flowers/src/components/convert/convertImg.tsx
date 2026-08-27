import { base64 } from './base64'
import type { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'

export default function convertImg() {
	const dispatch = useDispatch<AppDispatch>()

	const imgConvert = async (
		img: File | undefined,
		reducer: ActionCreatorWithPayload<string>,
	) => {
		if (!img) return
		if (img.type !== 'image/jpeg' && img.type !== 'image/png') return false
		try {
			const convert = await base64(img)
			if (typeof convert === 'string') {
				dispatch(reducer(convert))
			}
		} catch (error) {
			console.log(error)
		}
	}

	const imgConvertArchive = async (
		images: FileList | null,
		reducer: ActionCreatorWithPayload<string>,
	) => {
		if (!images) return

		try {
			for (let i of images) {
				if (i.type !== 'image/jpeg' && i.type !== 'image/png') return false
				const convert = await base64(i)
				if (typeof convert === 'string') {
					dispatch(reducer(convert))
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	return { imgConvert, imgConvertArchive }
}
