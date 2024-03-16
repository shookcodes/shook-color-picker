export const hslToHex = (h: number, s: number, l: number): FormatObjectReturn => {
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

export const hslToRgb = (h: number, s: number, l: number): FormatObjectReturn => {
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

export const hslToCmyk = (h: number, s: number, l: number): FormatObjectReturn | Error => {
	if (!h || !s || !l) return new Error('No HSL value provided.')
	// Convert HSL to RGB
	let r, g, b
	if (s === 0) {
		r = g = b = l // achromatic
	} else {
		const hue2rgb = (p, q, t) => {
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

	// Convert RGB to CMYK
	let c = 1 - r
	let m = 1 - g
	let y = 1 - b
	const k = Math.min(c, m, y)
	c = (c - k) / (1 - k)
	m = (m - k) / (1 - k)
	y = (y - k) / (1 - k)

	const string = `cmyk(${c}, ${m}, ${y}, ${k})`
	return { string, arr: [c, m, y, k] }
}
