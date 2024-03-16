export type { ColorObject, ConversionModels } from '@/types'

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
