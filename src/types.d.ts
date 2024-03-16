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
	wrapper: HTMLDivElement
	hue: number | string
}

export interface RGBObject {
	string: string
	arr: [r: number, g: number, b: number]
}

export interface HSLObject {
	string: string
	arr: [h: number, s: number, l: number]
}

export interface HexObject {
	string: string
}

export interface CMYKObject {
	string: string
	arr: [c: number, m: number, y: number, k: number]
}

export type ColorFunctionReturn = ColorObject | void

export type FormatObjectReturn = { string: string; arr?: string[] | number[] }

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
