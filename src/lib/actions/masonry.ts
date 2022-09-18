import toPixels from '$lib/utils/toPixels'

const masonry = (node: HTMLElement) => {
	const calculateLayout = () => {
		const items = [...node.childNodes]

		if (items.length === 0) return

		items.forEach((item) => (item as HTMLElement).style.removeProperty('margin-top'))

		const columns = getComputedStyle(node).gridTemplateColumns.split(' ').length

		items.slice(columns).forEach((item, index) => {
			const normalizedItem = item as HTMLElement

			const bottomItemAbove = (items[index] as HTMLElement).getBoundingClientRect().bottom
			const { top } = normalizedItem.getBoundingClientRect()

			const { gap } = getComputedStyle(node)

			normalizedItem.style.marginTop = `${bottomItemAbove + toPixels(gap, node) - top}px`
		})
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
