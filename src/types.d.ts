type ColorFormatOption = 'hex' | 'rgb' | 'hsl' | 'cmyk'

export interface ColorObject {
	hex: string
	rgb: string
	hsl: string
	cmyk: string
}

export interface CursorCoordinates {
	left: number
	top: number
}

export interface CanvasCoordinates {
	x: number
	y: number
}

export interface CanvasCoordinatesWithContext extends CanvasCoordinates {
	ctx: CanvasRenderingContext2D
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
	hex?: string
	hue?: number
}

export interface DrawCanvas {
	canvas: HTMLCanvasElement
	width: number
	height: number
	hue: number
}

export type ColorPickerThemeDefault = 'default'
export type ColorPickerThemeDark = 'dark'
export type ColorPickerThemeLight = 'light'

export type ColorPickerThemeOption =
	| ColorPickerThemeDefault
	| ColorPickerThemeDark
	| ColorPickerThemeLight

export interface ColorPickerTheme {
	[key: ColorPickerThemeOption]
}
