export type ColorStore = ColorObject[]
export type PaletteAction = 'add' | 'delete' | 'remove'

export interface PaletteActions {
	[key: string]: () => StoreValue<ColorStore>
}
