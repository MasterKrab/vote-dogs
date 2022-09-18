export const TIMES = {
	ALL_TIME: 'all-time',
	YEAR: 'year',
	MONTH: 'month',
	WEEK: 'week',
	DAY: 'day'
}

export const TIMES_TEXTS = {
	[TIMES.ALL_TIME]: 'All time',
	[TIMES.YEAR]: 'Year',
	[TIMES.MONTH]: 'Month',
	[TIMES.WEEK]: 'Week',
	[TIMES.DAY]: 'Day'
}

export type time = typeof TIMES[keyof typeof TIMES]
