import prisma from '$lib/server/prisma'

const voteDog = async (dogId: string) => {
	const dog = await prisma.vote.create({
		data: {
			dog: {
				connect: {
					id: dogId
				}
			}
		}
	})

	return dog
}

export default voteDog
