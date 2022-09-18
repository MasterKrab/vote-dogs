import type LoadFetch from '$lib/types/load-fetch'

const getTotalAmountOfDogs = async (availableFetch: LoadFetch = fetch) => {
	const response = await availableFetch('/api/dogs/total')
	const total = (await response.json()) as number

	return total
}

export default getTotalAmountOfDogs
