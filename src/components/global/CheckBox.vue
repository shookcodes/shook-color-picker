<template>
	<div class="checkbox" :class="className">
		<label
			ref="label"
			:for="name"
			:value="value ? value : name"
			class="label"
			@click="handleCheck(value ? value : '')"
			@mouseover="handleMouseOver(hoverCallback)"
			:style="labelStyle"></label>

		<input :id="id" :name="name" :checked="isChecked" type="checkbox" />
		<CheckSvg
			ref="icon"
			class="icon"
			:id="`icon-${id}`"
			:class="checked ? '' : 'text-transparent'"
			:style="checkMarkStyle" />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { StyleValue } from 'vue'
import CheckSvg from '@icons/check.svg?component'

interface Props {
	name: string
	value?: string
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

const { checked, checkStyle } = defineProps<Props>()
const emit = defineEmits<Emits>()

const checkMarkStyle = computed(() => checkStyle)
const isChecked = ref(false)

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
