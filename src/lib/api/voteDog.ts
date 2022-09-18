const getRandomDogs = async (id: string) => {
	await fetch(`/api/vote-dog?id=${id}`, {
		method: 'POST'
	})
}

export default getRandomDogs
