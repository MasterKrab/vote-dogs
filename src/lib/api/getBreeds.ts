import type LoadFetch from '$lib/types/load-fetch'
import type Breed from '$lib/types/breed'

const getBreeds = async (availableFetch: LoadFetch = fetch) => {
	const response = await availableFetch(`/api/breeds`)
	const breeds = (await response.json()) as Breed[]

	return breeds
}

export default getBreeds
