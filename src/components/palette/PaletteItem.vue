<template>
	<div class="palette-item">
		<!-- @mouseover="handleColorHover" -->
		<label
			ref="label"
			:for="color.hex"
			:value="color.hex"
			class="label"
			@click="handleCheck()"
			:style="{ background: color.hex }"></label>
		<CheckSvg ref="icon" class="icon" :id="`icon-${id}`" :style="checkStyle" />
		<input :id="color.hex" :name="color.hex" :checked="isChecked" type="checkbox" />
	</div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import CheckSvg from '@icons/check.svg?component'
import { toggleColor } from '@utils/convertColor'
import type { ColorObject } from '../../types'

interface Props {
	color: ColorObject
	id: string
}

interface Emits {
	(e: 'click', value: ColorObject): void
}

const { color, id } = defineProps<Props>()
const emit = defineEmits<Emits>()

const isChecked = ref(false)

const handleCheck = () => {
	isChecked.value = !isChecked.value

	const { hex, rgb, hsl, cmyk } = color

	emit('click', { hex, rgb, hsl, cmyk })
}

const checkStyle = computed(() => {
	const { hex } = color

	const fill = isChecked.value === true ? toggleColor({ hex }) : 'transparent'

	const stroke = isChecked.value === true ? toggleColor({ hex, invert: true }) : 'transparent'

	return {
		color: fill,
		stroke,
		strokeWidth: '1px',
		strokeLinejoin: 'round',
		paintOrder: 'stroke'
	}
})
</script>
<style scoped lang="scss">
.palette-item {
	@apply relative flex aspect-square w-full items-center justify-center transition-all;

	label {
		box-shadow: 2px 2px 6px rgba(#464646, 0.4);

		@apply flex aspect-square min-w-full items-center justify-center rounded-md border-2 border-neutral-100 hover:cursor-pointer;
	}

	.icon {
		@apply pointer-events-none absolute inset-0  m-auto h-auto w-9/12 transition-colors;
	}

	input[type='checkbox'] {
		display: none;
	}
}
</style>
