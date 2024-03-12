import { persistentAtom } from '@nanostores/persistent'
import type { ColorPickerSettings, ColorFormatBooleans, ColorFormatOption } from '../types'

export const locale = persistentAtom('locale', 'en')

export const $selectedFormats = persistentAtom<ColorFormatBooleans>(
	'shookColorFormatSettings',
	{
		hex: true,
		rgb: true,
		hsl: true,
		cmyk: true
	},
	{
		encode: JSON.stringify,
		decode: JSON.parse
	}
)

export const $settings = persistentAtom<ColorPickerSettings>(
	'shookColorPickerSettings',
	{
		showFormats: $selectedFormats.get()
	},
	{
		encode: JSON.stringify,
		decode: JSON.parse
	}
)

export const updateSettings = {
	colorModel: ({ format, value }: { format: ColorFormatOption; value: boolean }) => {
		$selectedFormats.set({ ...$selectedFormats.get(), [format]: value })
	}
}
