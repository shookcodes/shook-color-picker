import { setColorValues } from './colors'
import type { DrawCanvas, CanvasProps, ColorObject, CursorCoordinates } from '../types'

import { hslToRgb } from './colors/convertFromHsl'

// Draw the canvas based on it's wrapper's dimensions.
const setCanvas = ({ canvas, width, height, hue }: DrawCanvas) => {
	hue = typeof hue === 'string' ? parseInt(hue) : hue

	canvas.width = width
	canvas.height = height

	setCanvasGradient({ canvas, width, height, hue })
}

const setCanvasGradient = ({ canvas, width, height, hue }: CanvasProps) => {
	const ctx = canvas.getContext('2d')!
	ctx.imageSmoothingEnabled = true

	const [r, g, b] = hslToRgb(hue as number, 100, 50).arr

	ctx.fillStyle = '#FFFFFF'
	ctx.fillRect(0, 0, width, height)

	// Offset x values by 4 so that white and hue are are selectable in top right corner of canvas.
	const colorGradient = ctx.createLinearGradient(4, height, width - 4, height)

	colorGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)

	// End at 0.97 so default hsl value is selectable in top right of canvas.
	colorGradient.addColorStop(0.97, `rgba(${r}, ${g}, ${b}, 1)`)

	ctx.fillStyle = colorGradient
	ctx.fillRect(0, 0, width, height)

	// White to black gradient overlay
	const lightGradient = ctx.createLinearGradient(0, 0, 0, height * 0.99)

	lightGradient.addColorStop(0, `rgba(0, 0, 0, 0)`)
	lightGradient.addColorStop(0.1, `rgba(0, 0, 0, 0)`)
	lightGradient.addColorStop(0.99, `rgba(0, 0, 0, 1)`)

	ctx.fillStyle = lightGradient
	ctx.fillRect(0, 0, width, height)
}

const getColorAtCursorPosition = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number
): ColorObject | Error => {
	if (!ctx || !x || !y) return new Error('Values not provided to get color at this position.')
	const imageData = ctx.getImageData(x, y, 1, 1).data

	const toHex = (value: number) => {
		const hex = value.toString(16)
		return hex.length === 1 ? '0' + hex : hex
	}

	const currentHex = `#${toHex(imageData[0])}${toHex(imageData[1])}${toHex(imageData[2])}`

	const color = setColorValues({ hex: currentHex }) as ColorObject

	const isEmpty = Object.values(color).every((x) => x === null || x === '')

	if (isEmpty) return new Error('No color at current position')

	return { ...color }
}

const getColorPositionByHue = (canvas: HTMLCanvasElement, hue: number): string | Error => {
	const ctx = canvas.getContext('2d')

	if (!ctx || !hue) return new Error('Values not provided to get current color at position.')

	const [r, g, b] = hslToRgb(hue as number, 100, 50).arr

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	const data = imageData.data

	for (let y = 0; y < canvas.height; y++) {
		for (let x = 0; x < canvas.width; x++) {
			const offset = (y * canvas.width + x) * 4
			const r1 = data[offset]
			const g1 = data[offset + 1]
			const b1 = data[offset + 2]

			if (r1 === r && g1 === g && b1 === b) {
				console.log('HERE', x, y)
				return { x, y } //
			}
		}
	}

	return new Error('Color not found')
}

const getCursorPoint = (
	el: HTMLElement,
	x: number | string,
	y: number | string
): CursorCoordinates | Error => {
	if (!x || !y) return new Error('No coordinates found for cursor point.')

	x = typeof x === 'string' ? parseInt(x) : x
	y = typeof y === 'string' ? parseInt(y) : y

	const bounds = el.getBoundingClientRect()

	const left = bounds.left >= 0 ? x - bounds.left : x + bounds.left * -1

	const top = bounds.top >= 0 ? y - bounds.top : bounds.bottom + y

	return { left, top }
}

export {
	setCanvas,
	setCanvasGradient,
	getColorAtCursorPosition,
	getCursorPoint,
	getColorPositionByHue
}
