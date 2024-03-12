import type { ColorObject, ConversionModels, FormatObjectReturn } from '../types'

function _scrubHex(hex: string) {
	if (hex.charAt(0) === '#') {
		return (hex = hex.slice(1))
	}
	return hex
}

const hexToRgb = (hex: string): FormatObjectReturn | Error => {
	if (!hex) return new Error('No string provided.')
	hex = '0x' + _scrubHex(hex)

	const bigint = parseInt(hex, 16)

	const r = (bigint >> 16) & 0xff
	const g = (bigint >> 8) & 0xff
	const b = bigint & 0xff

	const string = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`

	return { string, arr: [r, g, b] }
}

const hexToHsl = (hex: string): FormatObjectReturn | Error => {
	if (!hex) return new Error('No string provided.')
	// Remove the hash if it exists
	hex = hex.replace(/^#/, '')

	// Convert hex to RGB
	const bigint = parseInt(hex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255

	// Normalize RGB values to range [0, 1]
	const normalizedR = r / 255
	const normalizedG = g / 255
	const normalizedB = b / 255

	// Find the maximum and minimum values
	const max = Math.max(normalizedR, normalizedG, normalizedB)
	const min = Math.min(normalizedR, normalizedG, normalizedB)

	// Calculate the lightness
	const lightness = (max + min) / 2

	// Calculate the saturation
	let saturation = 0
	if (max !== min) {
		saturation = lightness > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)
	}

	// Calculate the hue
	let hue = 0
	if (max === normalizedR) {
		hue = ((normalizedG - normalizedB) / (max - min) + 6) % 6
	} else if (max === normalizedG) {
		hue = (normalizedB - normalizedR) / (max - min) + 2
	} else if (max === normalizedB) {
		hue = (normalizedR - normalizedG) / (max - min) + 4
	}

	// Convert hue to degrees
	hue *= 60

	const h = Math.round(hue)
	const s = Math.round(saturation * 100)
	const l = Math.round(lightness * 100)

	const string = `hsl(${h}, ${s}, ${l})`
	return { string, arr: [h, s, l] }
}

const hslToRgb = (h: number, s: number, l: number): FormatObjectReturn => {
	h /= 360
	s /= 100
	l /= 100
	let r1, g1, b1

	if (s === 0) {
		r1 = g1 = b1 = l // achromatic
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r1 = hue2rgb(p, q, h + 1 / 3)
		g1 = hue2rgb(p, q, h)
		b1 = hue2rgb(p, q, h - 1 / 3)
	}

	const r = Math.round(r1 * 255)
	const g = Math.round(g1 * 255)
	const b = Math.round(b1 * 255)

	const string = `rgb(${r}, ${g}, ${b})`
	return { string, arr: [r, g, b] }
}

const hslToHex = (h: number, s: number, l: number): FormatObjectReturn => {
	h /= 360
	s /= 100
	l /= 100
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s
	const p = 2 * l - q
	const hueToRgb = (t: number) => {
		if (t < 0) t += 1
		if (t > 1) t -= 1
		if (t < 1 / 6) return Math.round((p + (q - p) * 6 * t) * 255)
		if (t < 1 / 2) return Math.round(q * 255)
		if (t < 2 / 3) return Math.round((p + (q - p) * (2 / 3 - t) * 6) * 255)
		return Math.round(p * 255)
	}
	const r = hueToRgb(h + 1 / 3)
	const g = hueToRgb(h)
	const b = hueToRgb(h - 1 / 3)

	const string = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

	return { string }
}

const hexToCmyk = (hex: string): FormatObjectReturn => {
	// Remove the hash if it exists
	hex = _scrubHex(hex)

	// Convert hex to RGB
	const bigint = parseInt(hex, 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255

	// Normalize RGB values to range [0, 1]
	const normalizedR = r / 255
	const normalizedG = g / 255
	const normalizedB = b / 255

	// Find the maximum value among R, G, and B
	const c1 = 1 - normalizedR
	const m1 = 1 - normalizedG
	const y1 = 1 - normalizedB
	const k1 = Math.min(c1, m1, y1)

	// Calculate CMYK values
	const cyan = (c1 - k1) / (1 - k1)
	const magenta = (m1 - k1) / (1 - k1)
	const yellow = (y1 - k1) / (1 - k1)
	const black = k1

	const c = Math.round(cyan * 100)
	const m = Math.round(magenta * 100)
	const y = Math.round(yellow * 100)

	const k = Math.round(black * 100)

	const string = `cmyk(${c}, ${m}, ${y}, ${k})`

	return { string, arr: [c, m, y, k] }
}

const updateColorValues = ({ hue, hex }: ConversionModels): ColorObject => {
	if (!hue && !hex) new Error('No values to update colors.')

	const colorObj = { hsl: '', hex: '', rgb: '', cmyk: '' } as ColorObject

	if (hue) {
		hue = typeof hue === 'string' ? parseInt(hue) : hue
		colorObj.hsl = `hsl(${hue}, ${100}, ${50})`
		colorObj.hex = hslToHex(hue, 100, 50).string
		colorObj.rgb = hslToRgb(hue as number, 100, 50).string
		colorObj.cmyk = hexToCmyk(colorObj.hex).string
	} else if (hex) {
		hex = _scrubHex(hex)

		const { string: convertedHex } = hexToHsl(hex) as FormatObjectReturn

		const { string: convertedRgb } = hexToRgb(hex) as FormatObjectReturn

		colorObj.hsl = convertedHex
		colorObj.hex = `#${hex}`
		colorObj.rgb = convertedRgb
		colorObj.cmyk = hexToCmyk(hex).string
	}

	return colorObj
}

const toggleColor = ({
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
	// invert = invert ? invert : false
	const { arr: rgbArr } = hexToRgb(hex) as FormatObjectReturn

	if (!rgbArr) throw new Error('Incorrect values provided for RGB calculation')
	const [r, g, b] = rgbArr.map((val) => (typeof val === 'string' ? parseInt(val) : val))

	const breakpoint = (value: number, point: number) => {
		return Math.round(value * point)
	}

	const r1 = breakpoint(r, 0.299)
	const g1 = breakpoint(g, 0.587)
	const b1 = breakpoint(b, 0.114)

	const res = parseInt((r1 + g1 + b1).toFixed(2))

	if (invert === true) {
		return res < 160 ? dark : light
	}

	return res > 160 ? dark : light
}

export { hslToRgb, hslToHex, hexToHsl, hexToRgb, hexToCmyk, updateColorValues, toggleColor }
