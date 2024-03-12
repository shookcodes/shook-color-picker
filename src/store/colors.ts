import { persistentAtom } from '@nanostores/persistent'

export const locale = persistentAtom('locale', 'en')

import type { ColorObject } from '../types'

export const $currentColor = persistentAtom<ColorObject>(
	'shookActiveColor',
	{ hex: '', rgb: '', hsl: '', cmyk: '' },
	{
		encode: JSON.stringify,
		decode: JSON.parse
	}
)

export const setCurrentColor = (color: ColorObject): void => {
	return $currentColor.set({ ...color })
}

export const $colorPalette = persistentAtom<ColorObject[]>('shookColorPickerColors', [], {
	encode: JSON.stringify,
	decode: JSON.parse
})

export const updatePalette = {
	add: () => {
		const { hex } = $currentColor.get()
		const palette = $colorPalette.get()

		const found = palette.find((match) => match.hex === hex)

		if (found) {
			return 'duplicate'
		}

		$colorPalette.set([...palette, $currentColor.get()])
	},

	deleteAll: () => {
		$colorPalette.set([])
	}
}
