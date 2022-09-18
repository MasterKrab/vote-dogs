import type { RequestHandler } from '@sveltejs/kit'

import { error } from '@sveltejs/kit'

import getRandomDogs from '$lib/server/getRandomDogs'

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
	const take = Number(searchParams.get('take')) || 2

	if (take < 1 || take > 10) throw error(400, 'Invalid take value')

	const dogs = await getRandomDogs(take)

	return new Response(JSON.stringify(dogs), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
