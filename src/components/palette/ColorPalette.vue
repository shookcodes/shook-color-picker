<template>
	<div class="palette">
		<div class="palette-colors">
			<div v-for="(color, index) in palette">
				<PaletteItem
					:color="color"
					:key="index"
					:id="color.hex.split('#')[1]"
					@click="(value: ColorObject) => updateSelectedColors(value)" />
			</div>
		</div>
		<div class="palette-actions">
			<Button className="button-palette-action clear-palette" ariaLabel="clear palette colors"
				>Clear Palette</Button
			>
			<Button className="button-palette-action save-palette" ariaLabel="save palette colors"
				>Save Palette</Button
			>
		</div>
	</div>
</template>
<script lang="ts" setup>
import PaletteItem from './PaletteItem.vue'
import Button from '@global/Button.vue'
import { $colorPalette } from '@store/colors'
import { useStore } from '@nanostores/vue'
import type { ColorObject } from '@/types'

const palette = useStore($colorPalette)

const selected: ColorObject[] = []

const updateSelectedColors = (color: ColorObject) => {
	const found = selected.findIndex((match: ColorObject) => match?.hex === color.hex)

	if (found === -1) {
		selected.push(color)
		return selected
	}

	selected.splice(found, 1)

	return selected
}
</script>

<style lang="scss" scoped>
@import '../../styles/button.scss';
.palette {
	// grid  grid-cols-5
	@apply flex flex-col gap-5;

	.palette-colors {
		z-index: 1;
		@apply mt-2 grid grid-cols-6 gap-2.5;
	}

	.palette-actions {
		@apply flex justify-between;
	}
}
</style>
