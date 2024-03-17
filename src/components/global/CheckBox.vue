<template>
	<label :class="className" class="checkbox-input-label" @input="handleClick">
		<!-- @mouseover="handleMouseOver(hoverCallback)" -->
		<span class="checkbox" :style="checkboxStyle">
			<input :id="id" type="checkbox" ref="checkboxEl" />
			<div class="checkmark">
				<CheckSvg
					ref="icon"
					:id="`icon-${id}`"
					:class="checked === true ? '' : 'text-transparent'"
					:style="checkStyle" /></div
		></span>
		<span class="checkbox-text">{{ label }}</span>
	</label>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { StyleValue } from 'vue'
import CheckSvg from '@icons/check.svg?component'

interface Props {
	name: string
	selected: boolean
	id?: string
	label?: string
	className?: string
	checkboxStyle?: StyleValue
	checkMarkStyle?: StyleValue
	checkCallback?: any
	hoverCallback?: any
}

interface Emits {
	(e: 'setSelected', value: boolean, name: string): void
	(e: 'mouseover', value?: any): void
}

const { name, checkMarkStyle, selected, ...props } = defineProps<Props>()
const emit = defineEmits<Emits>()

const checked = ref(selected)

const handleClick = () => {
	checked.value = !checked.value
	emit('setSelected', checked.value, name)
}

const checkStyle = computed(() => checkMarkStyle)
</script>
<style lang="scss" scoped>
@import '../../styles/button.scss';

input[type='checkbox'] {
	display: none;
	pointer-events: none;
}

.checkbox-input-label {
	@apply relative   flex items-center  gap-2 transition-all hover:cursor-pointer;

	.checkbox {
		box-shadow: 1px 1px 4px rgba(#464646, 0.4);

		@apply relative mt-0.5 flex aspect-square w-3.5 items-center justify-center rounded  border border-indigo-500 bg-indigo-300/30;

		& .checkmark {
			@apply pointer-events-none absolute  z-10 m-0 w-4  p-0 transition-colors;
		}
	}

	&.palette-checkbox .checkbox {
		// z-index: -1;
		@apply relative min-w-full rounded-md border border-neutral-100;

		.checkmark {
			@apply pointer-events-none absolute  inset-0 z-20 m-auto h-auto w-full  transition-colors;
		}
	}
}

.theme-dark {
	.checkbox-input-label {
		@apply border-indigo-400  text-indigo-300;

		.checkbox {
			@apply border-indigo-500   bg-indigo-800/40;
		}

		.checkbox-palette {
			.checkbox {
				@apply border-neutral-400;
			}
		}
	}
}
</style>
