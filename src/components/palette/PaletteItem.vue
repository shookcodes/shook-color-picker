<template>
	<CheckBox
		:id="id"
		:name="color.hex"
		:value="color.hex"
		@click="handleCheck"
		:checkStyle="checkStyle"
		:labelStyle="{ background: color.hex }"
		className="checkbox-palette z-10"
		:checked="isChecked" />
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

const handleCheck = () => {
	isChecked.value = !isChecked.value

	const { hex, rgb, hsl, cmyk } = color

	emit('click', { hex, rgb, hsl, cmyk })
}

const checkStyle = computed(() => {
	const { hex } = color

	const fill =
		isChecked.value === true ? Object.values(getLightDarkValues({ hex }))[0] : 'transparent'

	const stroke =
		isChecked.value === true
			? Object.values(getLightDarkValues({ hex, invert: true }))[0]
			: 'transparent'

	return {
		color: fill,
		stroke,
		strokeWidth: '1px',
		strokeLinejoin: 'round',
		paintOrder: 'stroke'
	}
})
</script>
