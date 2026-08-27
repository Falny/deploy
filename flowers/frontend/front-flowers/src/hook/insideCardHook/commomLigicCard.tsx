import React from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../axios'

type CardState = {
	id: string
	mainImg: string
	images: string[]
	name: string
	price: number
	count: number
	oldPrice?: number
	structure: string[]
	category: string[]
}

export const useCarouselInsideCard = (imgs: string[]) => {
	const [carouselIndex, setCarouselIndex] = React.useState<number>(0)
	const arrowTopRef = React.useRef<HTMLSpanElement>(null)
	const arrowBottomRef = React.useRef<HTMLSpanElement>(null)

	const sliceImages = imgs.slice(carouselIndex, carouselIndex + 2)

	React.useEffect(() => {
		const arrowBottom = arrowBottomRef.current
		const arrowTop = arrowTopRef.current

		const carouselBottom = () => {
			if (carouselIndex + 1 >= imgs.length - 1) return
			setCarouselIndex(prev => prev + 1)
		}

		const carouselTop = () => {
			if (carouselIndex - 1 <= -1) return
			setCarouselIndex(prev => prev - 1)
		}

		if (arrowBottom) {
			arrowBottom.addEventListener('click', carouselBottom)
		}
		if (arrowTop) {
			arrowTop.addEventListener('click', carouselTop)
		}

		return () => {
			arrowBottom?.removeEventListener('click', carouselBottom)
			arrowTop?.removeEventListener('click', carouselTop)
		}
	}, [carouselIndex, imgs.length])

	return {
		arrowBottomRef,
		arrowTopRef,
		sliceImages,
		carouselIndex,
	}
}

export const useCommomLogicCard = () => {
	const [card, setCard] = React.useState<CardState>({
		id: '',
		mainImg: '',
		images: [''],
		name: 'Загрузка...',
		price: 0,
		count: 0,
		structure: [],
		category: [],
	})
	const { id } = useParams()

	const carousel = useCarouselInsideCard(card.images)

	React.useEffect(() => {
		const fetchItem = async () => {
			if (!id) return
			try {
				const { data } = await instance.get(`/cards/${id}`)

				const imgMain = data.mainImg
				let formatImgMain = ''

				if (imgMain.startsWith('iVBOR')) formatImgMain = 'image/png'
				if (imgMain.startsWith('UklGR')) formatImgMain = 'image/webp'
				else formatImgMain = 'image/jpeg'

				data.mainImg = `data:${formatImgMain};base64,${imgMain}`

				const images = data.images

				let imagesList = []
				for (let i = 0; i < images.length; i++) {
					if (images[i].startsWith('iVBOR')) formatImgMain = 'image/png'
					if (images[i].startsWith('UklGR')) formatImgMain = 'image/webp'
					else formatImgMain = 'image/jpeg'

					imagesList.push(`data:${formatImgMain};base64,${images[i]}`)
				}
				data.images = imagesList

				setCard(data)
			} catch (err) {
				alert('Ошибка карточки товара')
				console.log('Ошибка карточки товара', err)
			}
		}

		fetchItem()
	}, [id])

	return {
		card,
		...carousel,
	}
}
