import type { RequestHandler } from '@sveltejs/kit'

import getTotalAmountOfDogs from '$lib/server/getTotalAmountOfDogs'

export const GET: RequestHandler = async () =>
	new Response(JSON.stringify(await getTotalAmountOfDogs()), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
