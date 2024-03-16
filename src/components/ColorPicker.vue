<template>
	<div
		ref="colorPicker"
		id="shook-color-picker"
		class="shook-color-picker background"
		:class="`theme-${theme}`">
		<MenuBar />
		<div class="color-picker-content">
			<div class="canvas-with-slider">
				<ColorCanvas />
				<ColorSlider />
			</div>

			<div class="selected-colors-group">
				<ActiveColor />
				<ColorInputGroup />
			</div>
		</div>
		<ColorPalette />
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import MenuBar from './menu/MenuBar.vue'
import ColorCanvas from './canvas/ColorCanvas.vue'
import ColorSlider from './ColorSlider.vue'
import ActiveColor from './ActiveColor.vue'
import ColorInputGroup from './ColorInputGroup.vue'
import ColorPalette from '@palette/ColorPalette.vue'
import { $theme } from '@/store/settings'
import { useStore } from '@nanostores/vue'

const theme = useStore($theme)
const colorPicker = ref()

onMounted(() => {
	colorPicker.value.style.opacity = '1'
})
</script>

<style lang="scss" scoped>
@import '../styles/global.scss';
@import '../styles/variables.scss';
.shook-color-picker {
	display: flex;
	flex-direction: column;
	max-width: 220px;
	width: max-content;
	transition: all 0.2s ease-in;
	z-index: 1;
	opacity: 0;
	@apply relative mx-auto rounded-md;

	.color-picker-content {
		z-index: 1;
	}

	.canvas-with-slider {
		@apply flex flex-col gap-3;
	}

	.selected-colors-group {
		@apply flex flex-col gap-2;
	}

	span {
		@apply text-neutral-700;
	}
}
</style>
