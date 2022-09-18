const loadImage = async (url: string): Promise<string> => {
	const image = new Image()

	return new Promise((resolve, reject) => {
		image.addEventListener('load', () => resolve(url))
		image.addEventListener('error', () => reject())
		image.src = url
	})
}

export default loadImage
