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

export const $selectedColors = persistentAtom<ColorObject[]>('shookSelectedColors', [], {
	encode: JSON.stringify,
	decode: JSON.parse
})

export const updateSelectedColors = {
	add: (color: ColorObject) => {
		const arr = [...$selectedColors.get()]

		const found = arr.find(({ hex }) => color.hex === hex)

		if (found) return new Error(`Color with hex ${color.hex} already selected.`)

		return $selectedColors.set([...arr, color])
	},
	remove: (color: ColorObject) => {
		const arr = $selectedColors.get()

		const found = arr.find(({ hex }) => color.hex === hex)

		if (!found) return new Error(`Color with ${color.hex} not found for removal.`)

		const index = arr.indexOf(found)
		arr.splice(index, 1)

		$selectedColors.set([...arr])
	}
}

export const setCurrentColor = (color: ColorObject): void => {
	return $currentColor.set({ ...color })
}

export const $sliderValue = persistentAtom<number>('shookSliderValue', 180, {
	encode: JSON.stringify,
	decode: JSON.parse
})

export const setSliderValue = (value: number) => $sliderValue.set(value)

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
	delete: (colors: ColorObject[]) => {
		const palette = $colorPalette.get()

		const arr = palette.filter((color) => {
			const found = colors.find(({ hex }) => color.hex === hex)

			if (!found) return color
		})

		$colorPalette.set([...arr])
		$selectedColors.set([])
	},
	deleteAll: () => {
		$colorPalette.set([])
	}
}

window.addEventListener('load', () => $selectedColors.set([]))
