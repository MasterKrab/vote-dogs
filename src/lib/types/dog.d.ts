import Breed from '$lib/types'

export interface Dog {
	id: string
	breed: Breed
	image: string
	createdAt: string
	updatedAt: string
}

export interface VotedDog extends Dog {
	votes?: number
}
