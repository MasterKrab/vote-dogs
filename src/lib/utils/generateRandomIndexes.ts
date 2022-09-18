const generateRandomIndexes = (length: number, amount: number) => {
	const indexes = new Set<number>()

	while (indexes.size < amount) {
		indexes.add(Math.floor(Math.random() * length))
	}

	return [...indexes]
}

export default generateRandomIndexes
