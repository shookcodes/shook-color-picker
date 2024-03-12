import type { DrawCanvas, CanvasProps, ColorObject } from '../types'

import { updateColorValues } from './convertColor'

const getColorAtPosition = (
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

	const color = updateColorValues({ hex: currentHex }) as ColorObject

	const isEmpty = Object.values(color).every((x) => x === null || x === '')

	if (isEmpty) return console.log('No color at current position')

	return { ...color }
}

// Draw the canvas based on it's wrapper's dimensions then return the canvas, ctx, and canvas marker values values for use in the ColorPicker.astro file.
const setCanvas = ({ wrapper, hue }: DrawCanvas) => {
	hue = typeof hue === 'string' ? parseInt(hue) : hue
	const width = wrapper.clientWidth
	const height = wrapper.clientHeight

	const canvas: HTMLCanvasElement = wrapper.querySelector('canvas')!
	const marker: HTMLDivElement = wrapper.querySelector('.color-marker')!
	canvas.width = width
	canvas.height = height

	const ctx = setCanvasGradient({ canvas, width, height, hue })

	return { canvas, ctx, marker }
}

const setCanvasGradient = ({ canvas, width, height, hue }: CanvasProps) => {
	const ctx = canvas.getContext('2d')!
	ctx.imageSmoothingEnabled = true

	// Update canvas color gradient based on the hue param
	const colorGradient = ctx.createLinearGradient(width * 0.04, height * 0.8, width, height)

	colorGradient.addColorStop(0, `hsla(0, 0%, 100%, 1)`)
	colorGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`)

	ctx.fillStyle = colorGradient
	ctx.fillRect(0, 0, width, height)

	// White to black gradient overlay
	const lightGradient = ctx.createLinearGradient(0.2, 0.2, 0, height * 0.95)

	lightGradient.addColorStop(0.05, `hsla(0, 0%, 100%, 1)`)
	lightGradient.addColorStop(1, `hsla(0, 0%, 0%, 1)`)

	ctx.globalCompositeOperation = 'multiply'
	ctx.fillStyle = lightGradient
	ctx.fillRect(0, 0, width, height)
	return ctx
}

const getCursorPoint = (el: HTMLElement, x: number | string, y: number | string) => {
	if (!x || !y) return

	x = typeof x === 'string' ? parseInt(x) : x
	y = typeof y === 'string' ? parseInt(y) : y

	const bounds = el.getBoundingClientRect()

	const left = bounds.left >= 0 ? x - bounds.left : x + bounds.left * -1

	const top = bounds.top >= 0 ? y - bounds.top : bounds.bottom + y

	return { left, top }
}

export { setCanvas, setCanvasGradient, getColorAtPosition, getCursorPoint }
