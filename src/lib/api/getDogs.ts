import type { Time } from '$lib/constants/times'
import type LoadFetch from '$lib/types/load-fetch'
import type { VotedDog } from '$lib/types/dog'

import toQueryParams from '$lib/utils/toQueryParams'

const getDogs = async (
	params: { take: number; skip: number; time: Time; breedId?: string },
	availableFetch: LoadFetch = fetch
) => {
	const response = await availableFetch(`/api/dogs?${toQueryParams(params)}`)
	const dogs = (await response.json()) as VotedDog[]

	return dogs
}

export default getDogs
