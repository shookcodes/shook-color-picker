<template>
	<button
		:id="id"
		:disabled="disabled ? true : false"
		:aria-label="ariaLabel"
		:aria-hidden="ariaHidden || false"
		:class="className"
		@click="$emit('clicked')">
		<slot />
	</button>
</template>
<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
interface Props {
	ariaLabel: string
	ariaHidden?: boolean
	disabled?: boolean
	className?: string
	id?: string
}

interface Emits {
	(e: 'clicked'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
<style lang="scss">
@import '../../styles/button.scss';
</style>
