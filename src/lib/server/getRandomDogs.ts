import prisma from '$lib/server/prisma'
import getTotalAmountOfDogs from '$lib/server/getTotalAmountOfDogs'
import generateRandomIndexes from '$lib/utils/generateRandomIndexes'

const total = await getTotalAmountOfDogs()

const getRandomDogs = async (take: number) => {
	const positions = generateRandomIndexes(total - 1, take)

	const dogs = await Promise.all(
		positions.map((position) =>
			prisma.dog.findFirst({
				skip: position,
				include: {
					breed: {
						select: {
							id: true,
							name: true
						}
					}
				}
			})
		)
	)

	return dogs
}

export default getRandomDogs
