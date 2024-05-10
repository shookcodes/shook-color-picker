export type { ColorObject, ConversionModels } from '@/types'

export type RGBArray = [r: number, g: number, b: number]

export type HSLArray = [h: number, s: number, l: number]

export type CMYKArray = [c: number, m: number, y: number, k: number]

export interface RGBObject {
	string: string
	arr: RGBArray
}

export interface HSLObject {
	string: string
	arr: HSLArray
}

export interface HexObject {
	string: string
}

export interface CMYKObject {
	string: string
	arr: CMYKArray
}

export type ColorFunctionReturn = ColorObject | void

export type FormatObjectReturn = { string: string; arr?: string[] | number[] }
