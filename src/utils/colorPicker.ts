import type { DrawCanvas, CanvasProps, ColorModels, ConversionModels } from '../types'

import { updateColorValues } from './convertColor'

// Draw the canvas based on it's wrapper's dimensions then return the canvas, ctx, and canvas marker values values for use in the ColorPicker.astro file.
const setCanvas = ({ wrapper, hue }: DrawCanvas) => {
	const width = wrapper.clientWidth
	const height = wrapper.clientHeight

	const canvas: HTMLCanvasElement = wrapper.querySelector('canvas')!
	const marker: HTMLDivElement = wrapper.querySelector('.color-marker')!
	canvas.width = width
	canvas.height = height

	const inputs = wrapper.parentElement!.querySelectorAll('.color-input') as HTMLInputElement[]

	const ctx = setCanvasGradient({ canvas, width, height, hue })

	// Initialize input values on page load
	updateInputValues(inputs, { hue })

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

const getCursorPoint = (el, x, y) => {
	if (!x || !y) return
	const bounds = el.getBoundingClientRect()

	const left = bounds.left >= 0 ? x - bounds.left : x + bounds.left * -1

	const top = bounds.top >= 0 ? y - bounds.top : bounds.bottom + y

	return { left, top }
}

const updateInputValues = (inputs: HTMLInputElement[], { hue, hex }: ConversionModels) => {
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

export { setCanvas, setCanvasGradient, getColorAtPosition, getCursorPoint, updateInputValues }
