const observeIntersect = (node: Element, options: IntersectionObserverInit = { root: null }) => {
	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		const isSomeIntersecting = entries.some(({ isIntersecting }) => isIntersecting)

		isSomeIntersecting && node.dispatchEvent(new CustomEvent('intersect'))
	}

	let observer = new IntersectionObserver(handleIntersect, options)

	observer.observe(node)

	return {
		update(options: IntersectionObserverInit) {
			observer.disconnect()
			observer = new IntersectionObserver(handleIntersect, options)
			observer.observe(node)
		},
		destroy() {
			observer.disconnect()
		}
	}
}

export default observeIntersect
