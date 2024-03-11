<template>
	<button :disabled="disabled ? true : false" :aria-label="ariaLabel" :class="className">
		<slot />
	</button>
</template>
<script lang="ts" setup>
interface Props {
	ariaLabel: string
	disabled?: boolean
	className?: string
}

defineProps<Props>()
</script>
<style lang="scss">
@import '../../styles/button.scss';
</style>
