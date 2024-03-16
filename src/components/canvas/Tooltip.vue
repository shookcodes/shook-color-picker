<template>
	<div ref="tooltip" class="tooltip-color">
		<span class="tooltip-color-preview"></span><span class="tooltip-color-text"></span>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Emits {
	(e: 'setTooltip', value: HTMLDivElement): void
}

const emit = defineEmits<Emits>()

const tooltip = ref()
onMounted(() => {
	emit('setTooltip', tooltip.value)
})
</script>

<style lang="scss" scoped>
.tooltip-color {
	position: absolute;
	display: flex;
	top: 0;
	left: 0;
	opacity: 0;
	margin: 0;
	background-color: #333;
	padding: 0.25rem 0.5rem;
	border-radius: 5px;
	width: max-content;
	align-items: center;
	gap: 0.5rem;
	transition: opacity 0.2s ease-in-out;
	z-index: 3;
	user-selidect: none;

	& .tooltip-color-text {
		user-select: none;
		@apply text-neutral-100;
	}

	& .tooltip-color-preview {
		width: 1rem;
		height: 1rem;
		border-radius: 4px;
		border: 1px solid #c7c7c7;
	}
}
</style>
