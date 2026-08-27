import React from 'react'

type MotionType = {
	ref: React.RefObject<HTMLDivElement | null>
}

export default function useMotion({ ref }: MotionType) {
	const [isVisible, setIsVisible] = React.useState(false)

	React.useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				} else {
					setIsVisible(false)
				}
			})
		})

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [])

	return isVisible
}
