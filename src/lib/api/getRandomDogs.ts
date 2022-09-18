import type { Dog } from '$lib/types/dog'

const getRandomDogs = async (take: number) => {
	const response = await fetch(`/api/random-dogs?take=${take}`)
	const dogs = (await response.json()) as Dog[]
	return dogs
}

export default getRandomDogs
