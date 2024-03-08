const componentToHex = (value) => {
	var hex = value.toString(16)
	return hex.length == 1 ? '0' + hex : hex
}

const convertToHex = (rgb) => {
	let sliced = rgb.substring(4).slice(0, -1).split(',')

	const r = parseInt(sliced[0])
	const g = parseInt(sliced[1])
	const b = parseInt(sliced[2])

	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function _scrubHex(hex) {
	if (hex.charAt(0) === '#') {
		return (hex = hex.slice(1))
	}
}

const convertFromHex = (value) => {
	const data = {}
	let hex

	// remove # from hex value
	const scrubbedHex = _scrubHex(value)

	hex = '0x' + scrubbedHex
	data.r = (hex >> 16) & 0xff
	data.g = (hex >> 8) & 0xff
	data.b = hex & 0xff

	return `rgb(${Math.round(data.r)}, ${Math.round(data.g)}, ${Math.round(data.b)})`
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

const hslToHex = (h: number, s: number, l: number) => {
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

export { convertToHex, convertFromHex, hslToRgb, hslToHex }
