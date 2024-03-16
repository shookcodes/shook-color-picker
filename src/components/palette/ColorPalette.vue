<template>
	<div class="palette" ref="paletteRef">
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
			<Button
				className="button-palette-action clear-palette"
				ariaLabel="clear palette colors"
				@click="handleClearPalette"
				>Clear Palette</Button
			>
			<!-- <Button className="button-palette-action save-palette" ariaLabel="save palette colors"
				>Save Palette</Button
			> -->
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import PaletteItem from './PaletteItem.vue'
import Button from '@global/Button.vue'
import { $colorPalette, updatePalette } from '@store/colors'
import { $showPalette } from '@store/settings'
import { useStore } from '@nanostores/vue'
import type { ColorObject } from '@/types'
import { watch } from 'vue'

const palette = useStore($colorPalette)
const showPalette = useStore($showPalette)

const paletteHeight = ref()
const paletteRef = ref()

const getPaletteHeight = () => {
	const { top, bottom } = paletteRef.value.getBoundingClientRect()

	return bottom - top
}

const setPaletteVisibility = (value: boolean) => {
	if (value === true) {
		paletteHeight.value = paletteRef.value.clientHeight

		paletteRef.value.style.marginTop = '0'

		setTimeout(() => {
			paletteRef.value.classList.remove('palette-hidden')
		}, 200)
		return paletteHeight.value
	} else {
		paletteRef.value.classList.add('palette-hidden')

		setTimeout(() => {
			paletteRef.value.style.marginTop = `-${getPaletteHeight()}px`
		}, 50)
	}
}

watch(palette, (value) => {
	if (value.length === 0) {
		return setPaletteVisibility(false)
	} else {
		setPaletteVisibility(showPalette.value)
	}
})

watch(showPalette, (bool) => {
	if (palette.value.length === 0) {
		return setPaletteVisibility(false)
	}
	setPaletteVisibility(bool)
})

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

const handleClearPalette = () => {
	setTimeout(() => {
		updatePalette.deleteAll()
	}, 200)
}

onMounted(() => {
	paletteHeight.value = getPaletteHeight()

	if (palette.value.length === 0) {
		return setPaletteVisibility(false)
	}
	setPaletteVisibility(showPalette.value)
})
</script>

<style lang="scss" scoped>
@import '../../styles/button.scss';
.palette {
	@apply border-top flex flex-col  gap-4 transition-all;

	.palette-colors {
		z-index: 1;
		@apply mt-3 grid grid-cols-6 gap-2.5;
	}

	.palette-actions {
		@apply flex justify-between;
	}
}

.palette-hidden {
	z-index: -1;
	@apply -mb-4 pt-0 opacity-0;
}
</style>
