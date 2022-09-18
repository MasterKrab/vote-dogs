import { getBreeds, getAllBreedImages } from '../src/lib/dogApi'
import prisma from '../src/lib/server/prisma'

console.log('Deleting database...')
await prisma.dog.deleteMany()
await prisma.breed.deleteMany()
console.log('Database deleted.')

console.log('Fetching breeds...')
const breeds = await getBreeds()
console.log(`${breeds.length} breeds fetched.`)

console.log('Filling database with breeds...')
const breedRecords = await prisma.breed.createMany({
	data: breeds.map((name) => ({
		name
	}))
})
console.log(`${breedRecords.count} breeds created.`)

console.log('Fetching dog images...')
const breedImages = await getAllBreedImages(
	await prisma.breed.findMany({
		select: {
			id: true,
			name: true
		}
	})
)
console.log(`${breedImages.length} images fetched.`)

console.log('Filling database with dogs...')
const dogRecords = await prisma.dog.createMany({ data: breedImages })
console.log(`${dogRecords.count} dogs created.`)
