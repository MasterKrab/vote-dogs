import type { Load } from '@sveltejs/kit'
import { TIMES } from '$lib/constants/times'

import getDogs from '$lib/api/getDogs'
import getTotalAmountOfDogs from '$lib/api/getTotalAmountOfDogs'
import getBreeds from '$lib/api/getBreeds'

export const load: Load = async ({ fetch }) => {
	const [dogs, totalAmountOfDogs, breeds] = await Promise.all([
		getDogs({ take: 30, skip: 0, time: TIMES.ALL_TIME }, fetch),
		getTotalAmountOfDogs(fetch),
		getBreeds(fetch)
	])

	return {
		dogs,
		totalAmountOfDogs,
		breeds
	}
}
