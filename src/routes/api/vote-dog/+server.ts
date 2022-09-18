import type { RequestHandler } from '@sveltejs/kit'

import { error } from '@sveltejs/kit'

import voteDog from '$lib/server/voteDog'

export const POST: RequestHandler = async ({ url: { searchParams } }) => {
	const id = searchParams.get('id')

	if (!id) {
		throw error(400, 'Missing dog id')
	}

	await voteDog(id)

	return new Response('success')
}
