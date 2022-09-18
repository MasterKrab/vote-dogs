import type { RequestHandler } from '@sveltejs/kit'

import getBreeds from '$lib/server/getBreeds'

export const GET: RequestHandler = async () =>
	new Response(JSON.stringify(await getBreeds()), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
