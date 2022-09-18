import type { RequestHandler } from '@sveltejs/kit'

import { error } from '@sveltejs/kit'

import { TIMES, Time } from '$lib/constants/times'
import getDogs from '$lib/server/getDogs'

const validTimes = new Set(Object.values(TIMES))

export const GET: RequestHandler = async ({ url: { searchParams } }) => {
	const time = searchParams.get('time') || TIMES.ALL_TIME

	if (!validTimes.has(time)) throw error(400, 'Invalid time value')

	const dogs = await getDogs({
		take: Number(searchParams.get('take')) || 10,
		skip: Number(searchParams.get('skip')) || 0,
		breedId: searchParams.get('breedId') || '',
		time: time as Time
	})

	return new Response(JSON.stringify(dogs), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
