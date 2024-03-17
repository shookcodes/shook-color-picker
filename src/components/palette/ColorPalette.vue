<template>
	<div class="palette" ref="paletteRef">
		<span class="palette-title">Palette</span>
		<div class="palette-colors">
			<div v-for="(color, index) in paletteItems">
				<PaletteItem :color="color" :key="index" :id="color.hex.split('#')[1]" />
			</div>
		</div>
		<div class="palette-actions">
			<Button
				className="button-palette-action clear-palette"
				ariaLabel="clear palette colors"
				@click="selectedColors.length > 0 ? handleRemoveSelected : handleClearPalette"
				>{{ selectedColors.length > 0 ? 'Remove Selected' : 'Clear Palette' }}</Button
			>
			<!-- <Button className="button-palette-action save-palette" ariaLabel="save palette colors"
				>Save Palette</Button
			> -->
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import PaletteItem from './PaletteItem.vue'
import Button from '@global/Button.vue'
import { $colorPalette, updatePalette, $selectedColors } from '@store/colors'
import { $showPalette } from '@store/settings'
import { useStore } from '@nanostores/vue'
import type { ColorObject } from '@/types'
import { watch } from 'vue'

const palette = useStore($colorPalette)
const showPalette = useStore($showPalette)
const selectedColors = useStore($selectedColors)

const paletteItems = computed(() => palette.value)

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
	@apply border-top flex flex-col  transition-all;

	.palette-title {
		@apply pb-1 pt-2 text-sm;
	}

	.palette-colors {
		z-index: 1;
		background: rgba($light, 0.8);
		@apply mb-5 grid grid-cols-5 gap-3.5 rounded-md px-1.5 pb-1.5 pt-1;
	}

	.palette-actions {
		@apply flex justify-between;
	}
}

.palette-hidden {
	z-index: -1;
	@apply -mb-4 pt-0 opacity-0;
}

.theme-dark {
	.palette-colors {
		background: rgba($dark, 0.4);
	}
}
</style>
