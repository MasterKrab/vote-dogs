import fetch from '$lib/utils/isomorphicFetch'

export const DOG_API_URL = 'https://dog.ceo/api'

export interface BreedsResponse {
	message: string[][]
	status: string
}

export const getBreeds = async () => {
	const response = await fetch(`${DOG_API_URL}/breeds/list/all`)
	const { message } = (await response.json()) as BreedsResponse

	return Object.keys(message)
}

export interface BreedImagesResponse {
	message: string[]
	status: string
}

export const getBreedImages = async (breed: string) => {
	const response = await fetch(`${DOG_API_URL}/breed/${breed}/images`)
	const { message: images } = (await response.json()) as BreedImagesResponse

	return images
}

export const getAllBreedImages = async (
	breeds: {
		id: string
		name: string
	}[]
) => {
	const breedImages = await Promise.all(
		breeds.map(async ({ id, name }) => {
			const images = await getBreedImages(name)

			return images.map((image) => ({ breedId: id, image }))
		})
	)

	return breedImages.flat()
}
