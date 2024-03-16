<template>
	<input
		ref="slider"
		:class="className"
		type="range"
		class="color-slider"
		min="0"
		max="360"
		aria-label="@/utils/colors/convertColore by sliding the range"
		@input="(e: Event) => handleSliderUpdate(e.target as HTMLInputElement)" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { setCanvas } from '@utils/colorPicker'
import { setColorValues } from '@utils/colors'
import { setCurrentColor, setSliderValue } from '@store/colors'

interface Props {
	className?: string
}

defineProps<Props>()

const slider = ref()
const wrapper = ref()

onMounted(() => {
	const { value } = slider.value
	setSliderValue(parseInt(value))

	wrapper.value = document.querySelector('.canvas-wrapper')

	return wrapper.value
})

const handleSliderUpdate = (target: HTMLInputElement) => {
	const hue = parseInt(target.value) as number

	const canvas = wrapper.value.querySelector('canvas')

	setCanvas({
		canvas,
		width: wrapper.value.clientWidth,
		height: wrapper.value.clientHeight,
		hue
	})

	const color = setColorValues({ hue })
	setSliderValue(hue)
	setCurrentColor(color)
}
</script>

<style lang="scss" scoped>
.color-slider {
	width: 100%;
	-webkit-appearance: none;
	appearance: none;
	width: 100%;
	height: 0.5rem;
	border-radius: 2rem;
	margin: 0.5rem 0;
	// Rainbow colors for slider
	background: linear-gradient(
		90deg,
		#ff0000,
		#ff4000,
		#ff8000,
		#ffbf00,
		#ffff00,
		#bfff00,
		#80ff00,
		#40ff00,
		#00ff00,
		#00ff40,
		#00ff80,
		#00ffbf,
		#00ffff,
		#00bfff,
		#0080ff,
		#0040ff,
		#0000ff,
		#4000ff,
		#8000ff,
		#bf00ff,
		#ff00ff,
		#ff00bf,
		#ff0080,
		#ff0040,
		#ff0000
	);
	outline: none;
	-webkit-transition: 0.2s;
	transition: opacity 0.2s;

	&::-webkit-slider-thumb,
	&::-moz-range-thumb {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		border: 1px solid #000;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 100%;
		background: transparent;
	}
}
</style>
