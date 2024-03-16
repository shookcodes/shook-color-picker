import { _scrubHex } from './_scrubHex'
import { hslToHex, hslToRgb, hslToCmyk } from './convertFromHsl'
import { hexToHsl, hexToRgb, hexToCmyk } from './convertFromHex'

export const setColorValues = ({ hue, hex }: ConversionModels): ColorObject => {
	if (!hue && !hex) new Error('No values to update colors.')

	const colorObj = { hsl: '', hex: '', rgb: '', cmyk: '' } as ColorObject

	if (hue) {
		hue = typeof hue === 'string' ? parseInt(hue) : hue
		colorObj.hsl = `hsl(${hue}, ${100}, ${50})`
		colorObj.hex = hslToHex(hue, 100, 50).string
		colorObj.rgb = hslToRgb(hue as number, 100, 50).string
		colorObj.cmyk = hslToCmyk(hue as number, 100, 50).string
	} else if (hex) {
		hex = _scrubHex(hex)

		const { string: convertedHex } = hexToHsl(hex) as FormatObjectReturn

		const { string: convertedRgb } = hexToRgb(hex) as FormatObjectReturn

		const { string: convertedCmyk } = hexToCmyk(hex) as FormatObjectReturn

		colorObj.hsl = convertedHex
		colorObj.hex = `#${hex}`
		colorObj.rgb = convertedRgb
		colorObj.cmyk = convertedCmyk
	}

	return colorObj
}
