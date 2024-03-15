export type { ColorFormatOption } from '@/types'

export type ColorStore = ColorObject[]
export type PaletteAction = 'add' | 'delete' | 'remove'

export interface PaletteActions {
	[key: string]: () => StoreValue<ColorStore>
}

export interface ColorFormatBooleans {
	hex: boolean
	rgb: boolean
	hsl: boolean
	cmyk: boolean
}

export type ColorPickerTheme = 'default' | 'dark' | 'light'

export interface ColorPickerSettings {
	formats: ColorFormatBooleans
	showPalette: boolean
	theme: ColorPickerTheme
}
