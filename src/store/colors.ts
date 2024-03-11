import { persistentAtom } from '@nanostores/persistent'

export const locale = persistentAtom('locale', 'en')

import type { ColorObject } from '../types'

export const $colorPalette = persistentAtom<ColorObject[]>('colors', [], {
	encode: JSON.stringify,
	decode: JSON.parse
})

export const $currentColor = persistentAtom<ColorObject>(
	'activeColor',
	{ hex: '', rgb: '', hsl: '', cmyk: '' },
	{
		encode: JSON.stringify,
		decode: JSON.parse
	}
)

export const updateCurrentColor = (color: ColorObject) => {
	$currentColor.set({ ...color })
}
