import { persistentAtom } from '@nanostores/persistent'
import type {
	ColorPickerSettings,
	ColorFormatBooleans,
	ColorFormatOption,
	ColorPickerThemeOption
} from './types'

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

const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const $theme = persistentAtom<ColorPickerThemeOption>('shookDarkMode', initialTheme, {
	encode: JSON.stringify,
	decode: JSON.parse
})

export const $showPalette = persistentAtom<boolean>('shookShowPaletteSetting', false, {
	encode: JSON.stringify,
	decode: JSON.parse
})

export const $settings = persistentAtom<ColorPickerSettings>(
	'shookColorPickerSettings',
	{
		formats: $selectedFormats.get(),
		showPalette: $showPalette.get(),
		theme: $theme.get()
	},
	{
		encode: JSON.stringify,
		decode: JSON.parse
	}
)

export const updateFormats = {
	colorModel: ({ format, value }: { format: ColorFormatOption; value: boolean }) => {
		$selectedFormats.set({ ...$selectedFormats.get(), [format]: value })
	}
}

export const updateShowPalette = (value: boolean) => {
	$showPalette.set(value)
	console.log('STA', $showPalette.get())
}

export const setTheme = (value: ColorPickerThemeOption) => {
	value.toLowerCase()
	$theme.set(value)

	const el = document.querySelector('#shook-color-picker')!

	const current = [...el.classList].find((item) => item.includes('theme'))

	if (!current) return
	el.classList.remove(current)
	el.classList.add(`theme-${value}`)
}

// Update theme if user changes OS settings
window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (event) => (event.matches ? setTheme('dark') : setTheme('light')))
