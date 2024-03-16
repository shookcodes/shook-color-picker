<template>
	<div
		ref="marker"
		class="color-marker marker-dark"
		:style="{ background: markerFill }"
		aria-label="selected color marker"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { getLightDarkValues } from '@utils/colors'

interface Props {
	markerColor: string
}
interface Emits {
	(e: 'setMarker', value: HTMLDivElement): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const marker = ref()

const markerFill = computed(() => {
	const light = '#f9f9f9'
	const dark = '#363636'

	if (props.markerColor) {
		// Set marker outlines based on canvas color selected on click event.
		const toggleVariant = Object.keys(
			getLightDarkValues({ hex: props.markerColor, light, dark })
		)[0]

		if (toggleVariant === 'light') {
			marker.value.classList.remove('marker-dark')
			marker.value.classList.add('marker-light')
		} else {
			marker.value.classList.remove('marker-light')
			marker.value.classList.add('marker-dark')
		}
	}
	return props.markerColor
})

onMounted(() => {
	emit('setMarker', marker.value)
})
</script>
<style lang="scss" scoped>
@import '../../styles/variables.scss';
.color-marker {
	position: absolute;
	display: none;
	width: 8px;
	height: 8px;
	top: 0;
	right: 0;
	caret-color: transparent;
	border-radius: 100%;

	filter: drop-shadow(0.75px 0.75px 2px rgba($dark, 0.6));

	&.marker-light {
		outline: 2px solid #363636;
		&::before {
			content: '';
			width: 12px;
			height: 12px;
			margin-top: -2px;
			margin-left: -2px;
			border-radius: 100%;
			outline: 1px solid $light;

			@apply absolute inset-0;
		}
	}

	&.marker-dark {
		outline: 2px solid $light;
		&::before {
			content: '';
			width: 12px;
			height: 12px;
			margin-top: -2px;
			margin-left: -2px;
			border-radius: 100%;
			outline: 1px solid #363636;

			@apply absolute inset-0;
		}
	}
}
</style>
