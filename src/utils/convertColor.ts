function _scrubHex(hex: string) {
	if (hex.charAt(0) === '#') {
		return (hex = hex.slice(1))
	}
	return hex
}

const hexToRgb = (hex: string): string => {
	// const rgb = { r: 0, g: 0, b: 0 }

	// // remove # from hex value
	// const scrubHex = _scrubHex(value)

	hex = '0x' + _scrubHex(hex)
	// rgb.r = (hex >> 16) & 0xff
	// rgb.g = (hex >> 8) & 0xff
	// rgb.b = hex & 0xff

	const bigint = parseInt(hex, 16)
	// const rgb: { r: number; g: number; b: number } = {
	const r = (bigint >> 16) & 0xff
	const g = (bigint >> 8) & 0xff
	const b = bigint & 0xff
	//   };

	return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

const hexToHsl = (hex: string) => {
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
	return `hsl(${h}, ${s}, ${l})`
}

const hslToRgb = (h: number, s: number, l: number) => {
	h /= 360
	s /= 100
	l /= 100
	let r, g, b

	if (s === 0) {
		r = g = b = l // achromatic
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
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}

	return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
}

const hslToHex = (h: number, s: number, l: number): string => {
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

	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const hexToCmyk = (hex: string) => {
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

	const cmyk = `cmyk(${c}, ${m}, ${y}, ${k})`

	return cmyk
}

export { hslToRgb, hslToHex, hexToHsl, hexToRgb, hexToCmyk }
