<template>
	<CheckBox
		:id="id"
		:name="color.hex"
		@set-selected="(value) => updateSelectedPaletteItem(value)"
		:checkMarkStyle="checkStyle"
		className="palette-checkbox z-10"
		:selected="isChecked"
		:checkboxStyle="{ background: color.hex }" />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { getLightDarkValues } from '@utils/colors'
import type { ColorObject } from '../../types'
import CheckBox from '@global/CheckBox.vue'
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

const updateSelectedPaletteItem = (value) => {
	const { hex, rgb, hsl, cmyk } = color

	emit('click', { ...color })
}

const checkStyle = computed(() => {
	const { hex } = color

	const fill = Object.values(getLightDarkValues({ hex }))[0]

	const stroke = Object.values(getLightDarkValues({ hex, invert: true }))[0]

	return {
		color: fill,
		stroke,
		strokeWidth: '1px',
		strokeLinejoin: 'round',
		paintOrder: 'stroke'
	}
})
</script>
