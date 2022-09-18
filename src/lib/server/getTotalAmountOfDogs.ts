import prisma from '$lib/server/prisma'

const getTotalAmountOfDogs = async () => prisma.dog.count()

export default getTotalAmountOfDogs
