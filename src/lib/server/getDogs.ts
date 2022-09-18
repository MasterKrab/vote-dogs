import type { time } from '$lib/constants/times'

import prisma from '$lib/server/prisma'
import { TIMES } from '$lib/constants/times'

const getDate = (time: time) => {
	const date = new Date()

	switch (time) {
		case TIMES.YEAR:
			date.setFullYear(date.getFullYear() - 1)
			break
		case TIMES.MONTH:
			date.setMonth(date.getMonth() - 1)
			break
		case TIMES.WEEK:
			date.setDate(date.getDate() - 7)
			break
		case TIMES.DAY:
			date.setDate(date.getDate() - 1)
			break
		default:
			break
	}

	return date
}

const getDogs = async ({
	take = 10,
	skip = 0,
	breedId,
	orderBy = {
		date: TIMES.ALL_TIME,
		order: 'desc'
	}
}: {
	take?: number
	skip?: number
	breedId?: string
	orderBy?: {
		date: time
		order: 'asc' | 'desc'
	}
}) => {
	const dogs = await prisma.dog.findMany({
		take,
		skip,
		where: breedId ? { breedId } : undefined,
		include: {
			_count: {
				select: {
					votes: true
				}
			},
			breed: {
				select: {
					id: true,
					name: true
				}
			},
			votes:
				orderBy.date === TIMES.ALL_TIME
					? undefined
					: {
							where: {
								createdAt: {
									gte: getDate(orderBy.date)
								}
							}
					  }
		},
		orderBy: orderBy ? { votes: { _count: orderBy.order } } : undefined
	})

	const normalizedDogs = dogs.map(({ _count, ...dog }) => ({
		...dog,
		votes: _count.votes
	}))

	return normalizedDogs
}

export default getDogs
