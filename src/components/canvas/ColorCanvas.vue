<template>
	<div class="canvas-wrapper">
		<ColorMarker @set-marker="(value: HTMLDivElement) => (markerRef = value)" />
		<Tooltip @set-tooltip="(value: HTMLDivElement) => (tooltipRef = value)" />
		<canvas
			ref="canvas"
			id="shook-color-picker-canvas"
			@mouseenter="tooltipRef.style.opacity = 1"
			@mouseleave="tooltipRef.style.opacity = 0"
			@mousemove="(e: MouseEvent) => handleUpdateTooltip(e, tooltipRef)"
			@click="(e: MouseEvent) => handleCanvasClick(e)"></canvas>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Tooltip from './Tooltip.vue'
import ColorMarker from './ColorMarker.vue'
import { getCursorPoint, getColorAtPosition } from '@utils/colorPicker'
import { updateColorValues } from '@utils/convertColor'
import { setCanvas } from '@/utils/colorPicker'
import { $sliderValue, setCurrentColor } from '@/store/colors'
import { useStore } from '@nanostores/vue'
import type { ColorObject, CursorCoordinates } from '@/types'

const sliderValue = useStore($sliderValue)

const canvas = ref()
const ctx = ref()
const wrapper = ref()
const tooltipRef = ref()
const markerRef = ref()

interface CursorValues {
	hex: string
	left: number
	top: number
	callback?: any
}

const getValuesFromCursor = (e: MouseEvent, el: HTMLCanvasElement): CursorValues | Error => {
	const ctx = el.getContext('2d')
	const x = e.clientX
	const y = e.clientY

	const { top, left }: CursorCoordinates = getCursorPoint(canvas.value, x, y) as CursorCoordinates

	const { hex } = getColorAtPosition(ctx, left, top) as ColorObject

	if (!hex) return new Error('No color found at position')

	return { hex, top, left }
}

const handleUpdateTooltip = (e: MouseEvent, tooltip: HTMLDivElement) => {
	if (!e || !tooltip) return
	const tooltipText = tooltip.querySelector('.tooltip-color-text')! as HTMLSpanElement
	const tooltipColor = tooltip.querySelector('.tooltip-color-preview')! as HTMLDivElement

	const { hex, left, top } = getValuesFromCursor(e, canvas.value) as CursorValues

	if (!left || !top) {
		tooltip.style.opacity = '0'
		return new Error('No color found at selected coordinates.')
	}
	tooltip.style.opacity = '1'
	tooltip.style.left = `${left + 10}px`
	tooltip.style.top = `${top}px`

	tooltipText.innerText = hex

	tooltipColor.style.background = hex
}

const handleCanvasClick = (e: MouseEvent) => {
	const x = e.clientX
	const y = e.clientY

	const { hex, left, top } = getValuesFromCursor(e, canvas.value) as CursorValues

	if (!left || !top) {
		return new Error('No color found at clicked coordinates.')
	}

	markerRef.value.style.display = 'block'

	markerRef.value.style.left = (left - 4 + 'px').toString()
	markerRef.value.style.top = (top - 4 + 'px').toString()

	// Get color object based on hex value and set the new object to the store.
	const color = updateColorValues({ hex })
	setCurrentColor(color)
	return color
}

onMounted(() => {
	wrapper.value = canvas.value.parentElement
	ctx.value = canvas.value.getContext('2d')
	setCanvas({ wrapper: wrapper.value, hue: sliderValue.value })
	console.log('TT', tooltipRef.value)
})
</script>
<style lang="scss" scoped>
.canvas-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	height: 160px;
}

canvas {
	height: 160px;
	@apply rounded-md border border-neutral-100;
}

.theme-dark {
	canvas {
		@apply border-neutral-700;
	}
}
</style>
