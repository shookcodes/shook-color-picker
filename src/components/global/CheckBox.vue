<template>
	<div :class="className">
		<label
			ref="label"
			:for="name"
			:value="name"
			class="label"
			@click="handleCheck(value)"
			@mouseover="handleMouseOver(hoverCallback)"
			:style="labelStyle"></label>
		<CheckSvg ref="icon" class="icon" :id="`icon-${id}`" :style="checkStyle" />
		<input :id="id" :name="name" :checked="checked" type="checkbox" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StyleValue } from 'vue'
import CheckSvg from '@icons/check.svg?component'

interface Props {
	name: string
	value: string
	id: string
	checked: boolean
	className?: string
	labelStyle?: StyleValue
	checkStyle?: StyleValue
	checkCallback?: any
	hoverCallback?: any
}

interface Emits {
	(e: 'click', checkCallback: any): void
	(e: 'mouseover', value?: any): void
}

interface Props {
	name: string
	value: string
	id: string
}

const { checked } = defineProps<Props>()
const emit = defineEmits<Emits>()

const isChecked = ref(checked || false)

const handleCheck = (value: any) => {
	isChecked.value = !isChecked.value

	if (value) emit('click', value)
}

const handleMouseOver = (hoverCallback: any) => {
	emit('mouseover', hoverCallback)
}
</script>
<style lang="scss" scoped>
@import '../../styles/button.scss';
@import '../../styles/input.scss';
</style>
