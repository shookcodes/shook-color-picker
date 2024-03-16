import { _scrubHex } from './_scrubHex'
import { hslToHex, hslToRgb, hslToCmyk } from './convertFromHsl'
import { hexToHsl, hexToRgb, hexToCmyk } from './convertFromHex'
import type { ConversionModels, ColorObject, FormatObjectReturn } from './types'

export const setColorValues = ({ hue, hex }: ConversionModels): ColorObject | Error => {
	if (!hue && !hex) new Error('No values to update colors.')

	const colorObj = { hsl: '', hex: '', rgb: '', cmyk: '' } as ColorObject

	if (hue) {
		hue = typeof hue === 'string' ? parseInt(hue) : hue

		const { string: convertedHex } = hslToHex(hue, 100, 50) as FormatObjectReturn

		const { string: convertedRgb } = hslToRgb(hue as number, 100, 50) as FormatObjectReturn

		const { string: convertedCmyk } = hslToCmyk(hue as number, 100, 50) as FormatObjectReturn

		colorObj.hsl = `hsl(${hue}, ${100}, ${50})`
		colorObj.hex = convertedHex
		colorObj.rgb = convertedRgb
		colorObj.cmyk = convertedCmyk
	} else if (hex) {
		hex = _scrubHex(hex)

		const { string: convertedHsl } = hexToHsl(hex) as FormatObjectReturn

		const { string: convertedRgb } = hexToRgb(hex) as FormatObjectReturn

		const { string: convertedCmyk } = hexToCmyk(hex) as FormatObjectReturn

		colorObj.hsl = convertedHsl
		colorObj.hex = `#${hex}`
		colorObj.rgb = convertedRgb
		colorObj.cmyk = convertedCmyk
	}

	return colorObj
}
