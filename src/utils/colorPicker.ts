import type { ColorModels, CanvasProps } from '../types'

import { updateColorValues } from './convertColor'

// Draw the canvas then set the canvas colors
const drawCanvas = ({ width, canvas, height, hue, zoom }: CanvasProps) => {
	canvas.width = width
	canvas.height = height

	const ctx = setCanvasGradient({ canvas, width, height, hue, zoom })

	return ctx
}

const setCanvasGradient = ({ canvas, width, height, hue, zoom }: CanvasProps) => {
	if (zoom) {
		width = width * zoom
		height = height * zoom
	}
	const ctx = canvas.getContext('2d')!
	ctx.imageSmoothingEnabled = true

	// Update canvas color gradient based on the hue param
	const colorGradient = ctx.createLinearGradient(width * 0.04, height * 0.8, width, height)

	colorGradient.addColorStop(0, `hsla(0, 0%, 100%, 1)`)
	colorGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0.9)`)

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

const getColorAtPosition = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
	if (!ctx || !x || !y) return
	const imageData = ctx.getImageData(x, y, 1, 1).data

	const toHex = (value: number) => {
		const hex = value.toString(16)
		return hex.length === 1 ? '0' + hex : hex
	}

	const currentHex = `#${toHex(imageData[0])}${toHex(imageData[1])}${toHex(imageData[2])}`

	const { hex, rgb, hsl, cmyk } = updateColorValues({ hex: currentHex }) as ColorModels
	return { hex, rgb, hsl, cmyk }
}

const updateInputValues = (inputs: HTMLInputElement[], hex: string) => {
	const colorValues = updateColorValues({ hex }) as ColorModels
	inputs.forEach((input) => {
		const type = input.id.split('input-')[1] as keyof ColorModels
		if (!type) return

		if (type && type in colorValues) {
			input.value = colorValues[type]
		}
	})
}

export { drawCanvas, setCanvasGradient, getColorAtPosition, updateInputValues }
