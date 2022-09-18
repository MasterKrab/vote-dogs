const UNITS = {
	px: 1,
	em: 16,
	rem: 16,
	vw: () => window.innerWidth / 100,
	vh: () => window.innerHeight / 100,
	vmin: () => Math.min(window.innerWidth, window.innerHeight) / 100,
	vmax: () => Math.max(window.innerWidth, window.innerHeight) / 100,
	'%': ({ parentElement }: HTMLElement) => {
		{
			if (!parentElement) return

			const { width } = parentElement.getBoundingClientRect()
			return width / 100
		}
	}
}

const toPixels = (value: string, node: HTMLElement) => {
	const [number, unit] = value.split(/(\d+)/).filter(Boolean)

	const hasUnit = unit in UNITS

	if (!hasUnit) throw new Error(`Unit ${unit} is not supported`)

	const unitValue = UNITS[unit as keyof typeof UNITS]

	const normalizedUnitValue = typeof unitValue === 'function' ? unitValue(node) : unitValue

	if (!normalizedUnitValue) throw new Error(`Unit ${unit} is not supported`)

	return Number(number) * normalizedUnitValue
}

export default toPixels
