import prisma from '$lib/server/prisma'

const getBreeds = async () => {
	const breeds = await prisma.breed.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: {
			name: 'asc'
		}
	})

	return breeds
}

export default getBreeds
