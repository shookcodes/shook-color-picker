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

export interface Canvas2DSize {
	width: number
	height: number
}

export interface CanvasProps extends Canvas2DSize {
	canvas: HTMLCanvasElement
	hex: string
	zoom?: number
}
