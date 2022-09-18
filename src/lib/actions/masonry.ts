import toPixels from '$lib/utils/toPixels'

const masonry = (node: HTMLElement) => {
	const calculateLayout = () => {
		const items = [...node.childNodes]

		if (items.length === 0) return

		for (const item of items) {
			;(item as HTMLElement).style.removeProperty('margin-top')
		}

		const { gridTemplateColumns, gap } = getComputedStyle(node)

		const columns = gridTemplateColumns.split(' ').length
		const normalizedGap = toPixels(gap, node)

		for (let i = columns; i < items.length; i++) {
			const item = items[i] as HTMLElement

			const bottomItemAbove = (items[i - columns] as HTMLElement).getBoundingClientRect().bottom
			const { top } = item.getBoundingClientRect()

			item.style.marginTop = `${bottomItemAbove + normalizedGap - top}px`
		}
	}

	const observer = new ResizeObserver(calculateLayout)

	observer.observe(node)

	calculateLayout()

	return {
		destroy() {
			observer.disconnect()
		}
	}
}

export default masonry
