import { persistentAtom } from '@nanostores/persistent'
import type { PaletteAction } from './types'

export const locale = persistentAtom('locale', 'en')

import type { ColorObject } from '../types'

export const $currentColor = persistentAtom<ColorObject>(
	'activeColor',
	{ hex: '', rgb: '', hsl: '', cmyk: '' },
	{
		encode: JSON.stringify,
		decode: JSON.parse
	}
)

export const setCurrentColor = (color: ColorObject) => {
	$currentColor.set({ ...color })
}

export const $colorPalette = persistentAtom<ColorObject[]>('colors', [], {
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
	}
}
