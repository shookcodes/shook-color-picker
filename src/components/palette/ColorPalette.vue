<template>
	<div class="palette">
		<div class="palette-colors">
			<div v-for="(color, index) in palette">
				<PaletteItem :color="color" :key="index" />
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
import { ref } from 'vue'
import PaletteItem from './PaletteItem.vue'
import Button from '@global/Button.vue'
import { $colorPalette } from '@store/colors'
import { useStore } from '@nanostores/vue'

const palette = useStore($colorPalette)

const selected = ref([])
</script>

<style lang="scss" scoped>
@import '../../styles/button.scss';
.palette {
	// grid  grid-cols-5
	@apply flex flex-col gap-5;

	.palette-colors {
		@apply mt-4 grid grid-cols-6 gap-3;
	}

	.palette-actions {
		@apply flex justify-between;
	}
}
</style>
