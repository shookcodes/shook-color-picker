<template>
	<button
		:id="id"
		:disabled="disabled ? true : false"
		:aria-label="ariaLabel"
		:class="className"
		@click="$emit('clicked')">
		<slot />
	</button>
</template>
<script lang="ts" setup>
interface Props {
	ariaLabel: string
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
