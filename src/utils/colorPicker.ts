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
	const imageData = ctx.getImageData(x, y, 1, 1).data

	const toHex = (value: number) => {
		const hex = value.toString(16)
		return hex.length === 1 ? '0' + hex : hex
	}

	const currentHex = `#${toHex(imageData[0])}${toHex(imageData[1])}${toHex(imageData[2])}`

	return currentHex
}

const updateColorInputValues = (inputs) => {

}

export { setCanvasGradient, getColorAtPosition, updateColorInputValues }
