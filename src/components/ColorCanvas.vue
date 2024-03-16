<template>
	<div class="canvas-wrapper">
		<div class="color-marker" aria-label="selected color marker"></div>

		<!-- <Tooltip /> -->
		<canvas ref="canvas" id="shook-color-picker-canvas"></canvas>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { setCanvas } from '@/utils/colorPicker'
import { $sliderValue } from '@/store/colors'
import { useStore } from '@nanostores/vue'
const canvas = ref()

const sliderValue = useStore($sliderValue)

onMounted(() => {
	const wrapper = canvas.value.parentElement

	setCanvas({ wrapper, hue: sliderValue.value })
})
</script>
