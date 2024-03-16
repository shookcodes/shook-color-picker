import { _scrubHex } from './_scrubHex'
import type { FormatObjectReturn } from './types'
export const hexToRgb = (hex: string): FormatObjectReturn | Error => {
	if (!hex) return new Error('No string provided.')
	hex = '0x' + _scrubHex(hex)

	const bigint = parseInt(hex, 16)

	const r = (bigint >> 16) & 0xff
	const g = (bigint >> 8) & 0xff
	const b = bigint & 0xff

	const string = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`

	return { string, arr: [r, g, b] }
}

export const hexToHsl = (hex: string): FormatObjectReturn | Error => {
	if (!hex) return new Error('No hex value provided.')
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

	const h = Math.round(hue) || 0
	const s = Math.round(saturation * 100)
	const l = Math.round(lightness * 100)

	const string = `hsl(${h}, ${s}, ${l})`

	return { string, arr: [h, s, l] }
}

export const hexToCmyk = (hex: string): FormatObjectReturn => {
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

	const c = Math.round(cyan * 100) || 0
	const m = Math.round(magenta * 100) || 0
	const y = Math.round(yellow * 100) || 0
	const k = Math.round(black * 100) || 0

	const string = `cmyk(${c}, ${m}, ${y}, ${k})`

	return { string, arr: [c, m, y, k] }
}
