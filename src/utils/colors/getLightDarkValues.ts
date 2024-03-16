import { hexToRgb } from './convertFromHex'
import type { FormatObjectReturn } from './types'

export const getLightDarkValues = ({
	hex,
	light,
	dark,
	invert
}: {
	hex: string
	light?: string
	dark?: string
	invert?: boolean
}) => {
	light = light ? light : '#f7f7f7'
	dark = dark ? dark : '#212121'

	const { arr: rgbArr } = hexToRgb(hex) as FormatObjectReturn

	if (!rgbArr) throw new Error('Incorrect values provided for RGB calculation')
	const [r, g, b] = rgbArr.map((val: number | string) =>
		typeof val === 'string' ? parseInt(val) : val
	)

	const breakpoint = (value: number, point: number) => {
		return Math.round(value * point)
	}

	const r1 = breakpoint(r, 0.299)
	const g1 = breakpoint(g, 0.587)
	const b1 = breakpoint(b, 0.114)

	const res = parseInt((r1 + g1 + b1).toFixed(2))

	if (invert === true) {
		return res < 160 ? { dark } : { light }
	}

	return res > 160 ? { dark } : { light }
}
