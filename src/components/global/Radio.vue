<template>
	<label class="radio-input-label" :aria-label="ariaLabel" @click="emit('click', value)">
		<span class="radio" :class="isSelected === true ? 'radio-checked' : ''"
			><input type="radio" :id="id" :name="name" /></span
		><span class="radio-text">{{ label }}</span></label
	>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
	name: string
	label: string
	ariaLabel: string
	value: string
	selected?: boolean
	id?: string
}

interface Emits {
	(e: 'click', value: string): void
}

const props = defineProps<Props>()

const isSelected = computed(() => props.selected)

const emit = defineEmits<Emits>()
</script>
<style lang="scss" scoped>
.radio-input-label {
	@apply flex items-center gap-1.5;

	input[type='radio'] {
		display: none;
		@apply relative z-0;
	}

	.radio {
		@apply relative mt-0.5 h-3.5 w-3.5 rounded-full  border border-indigo-600 shadow-sm;
		//
		&.radio-checked {
			&::before {
				content: '';
				@apply absolute inset-0 m-auto h-2 w-2 rounded-full bg-indigo-700;
			}
		}
	}

	.radio-text {
		@apply text-indigo-800;
	}
}

.theme-dark {
	.radio {
		@apply border-indigo-400;

		&.radio-checked {
			&::before {
				@apply bg-indigo-500;
			}
		}
	}

	.radio-text {
		@apply text-indigo-300;
	}
}
</style>
