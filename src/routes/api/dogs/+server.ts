import type { RequestHandler } from '@sveltejs/kit'

import getDogs from '$lib/server/getDogs'

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
	const dogs = await getDogs({
		take: Number(searchParams.get('take')) || 10,
		skip: Number(searchParams.get('skip')) || 0,
		breedId: searchParams.get('breedId') || ''
	})

	return new Response(JSON.stringify(dogs), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
