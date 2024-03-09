import type { DrawCanvas, CanvasProps, ColorModels } from '../types'

import { updateColorValues } from './convertColor'

// Draw the canvas based on it's wrapper's dimensions then return the canvas, ctx, and canvas marker values values for use in the ColorPicker.astro file.
const initializeCanvas = ({ wrapper, hue }: DrawCanvas) => {
	const width = wrapper.clientWidth
	const height = wrapper.clientHeight

	const canvas = wrapper.querySelector('canvas')
	const marker: HTMLDivElement = wrapper.querySelector('.color-marker')!
	canvas.width = width
	canvas.height = height

	const inputs = wrapper.parentElement.querySelectorAll('.color-input')

	console.log('IN INt', inputs)
	const ctx = setCanvasGradient({ canvas, width, height, hue })

	// Initialize input values on page load
	const vals = updateInputValues(inputs, { hue })

	console.log('DAT', ctx)

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

const updateInputValues = (inputs: HTMLInputElement[], { hue, hex }: ConversionModels) => {
	console.log('IN', inputs)
	if (inputs.length === 0 || (!hex && !hue)) {
		console.log('Error updating input color values')
		return
	}

	const colorValues = hex
		? (updateColorValues({ hex }) as ColorModels)
		: (updateColorValues({ hue }) as ColorModels)
	inputs.forEach((input) => {
		const type = input.id.split('input-')[1] as keyof ColorModels
		if (!type) return

		if (type && type in colorValues) {
			input.value = colorValues[type]
		}
	})
	return { ...colorValues }
}

export { initializeCanvas, setCanvasGradient, getColorAtPosition, updateInputValues }
