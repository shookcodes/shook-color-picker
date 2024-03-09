import type { ColorModels, CanvasProps } from '../types'

import { updateColorValues } from './convertColor'

// Draw the canvas then set the canvas colors
const drawCanvas = ({ width, canvas, height, hex, zoom }: CanvasProps) => {
	canvas.width = width
	canvas.height = height

	const { ctx } = setCanvasGradient({ canvas, width, height, currentHex: hex, zoom })

	return ctx
}

const setCanvasGradient = ({
	canvas,
	width,
	height,
	currentHex = '#ffffff',
	zoom
}: CanvasProps) => {
	if (zoom) {
		width = width * zoom
		height = height * zoom
	}
	const ctx = canvas.getContext('2d')!
	ctx.imageSmoothingEnabled = false

	// Update canvas color based on the hex param
	const colorGradient = ctx.createLinearGradient(0, 0, width, 0)
	const { hex, rgb, hsl, cmyk } = updateColorValues({ hex: currentHex }) as ColorModels

	console.log('HS', hex, rgb, hsl, cmyk)
	colorGradient.addColorStop(0, hex)
	colorGradient.addColorStop(1, hex)
	ctx.fillStyle = colorGradient

	ctx.fillRect(0, 0, width, height)

	// Update white -> color -> black gradient on canvas
	const brightnessGradient = ctx.createLinearGradient(0, 0, 0, height)
	brightnessGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
	brightnessGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
	brightnessGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
	brightnessGradient.addColorStop(1, 'rgba(0, 0, 0, 1)')

	ctx.fillStyle = brightnessGradient
	ctx.fillRect(0, 0, width, height)

	return { ctx }
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
