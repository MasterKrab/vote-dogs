import type { RequestHandler } from '@sveltejs/kit'

import { error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
	const url = searchParams.get('url')

	if (!url) throw error(400, 'Missing url')

	if (!url?.startsWith('https://images.dog.ceo/breeds/')) throw error(400, 'Invalid image url')

	const { body, headers } = await fetch(url)

	return new Response(body, {
		headers: {
			'Content-Type': headers.get('Content-Type')!
		}
	})
}
