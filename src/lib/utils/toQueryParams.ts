const toQueryParams = (params: { [key: string]: string | number | boolean | undefined | null }) =>
	Object.keys(params)
		.map((key) => `${key}=${params[key]}`)
		.join('&')

export default toQueryParams
