import { hslToHex, hslToRgb, hexToRgb, hexToCmyk } from './convertColor'

export interface ColorModels {
	hex: string
	rgb: string
	hsl: string
	cmyk: string
}

export interface ConversionModels {
	hue?: string | number
	hex?: string | undefined
}
const updateColorValues = ({ hue, hex }: ConversionModels): ColorModels | void => {
	if (!hue && !hex) return
	hue = typeof hue === 'string' ? parseInt(hue) : hue

	// Update color model values depending on if value provided is hue and/or hex
	hex = hue ? hslToHex(hue, 100, 50) : (hex as string)
	const rgb = hex ? hexToRgb(hex) : hslToRgb(hue as number, 100, 50)
	const hsl = `hsl(${hue}, ${100}, ${50})`
	const cmyk = hexToCmyk(hex)

	return { hex, rgb, hsl, cmyk }
}

const setCanvasGradient = (canvas: HTMLCanvasElement, hex: string) => {
	const ctx = canvas.getContext('2d')!
	// Update canvas color
	const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
	gradient.addColorStop(0, hex)
	ctx.fillStyle = gradient

	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// Update white -> color -> black gradient on canvas
	const brightnessGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
	brightnessGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
	brightnessGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
	brightnessGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
	brightnessGradient.addColorStop(1, 'rgba(0, 0, 0, 1)')

	ctx.fillStyle = brightnessGradient
	ctx.fillRect(0, 0, canvas.width, canvas.height)

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
			console.log('Type:', { [type]: colorValues[type] })
			input.value = colorValues[type]
		}
	})
}

export { updateColorValues, setCanvasGradient, getColorAtPosition, updateInputValues }
