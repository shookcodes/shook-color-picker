<template>
	<button :disabled="disabled ? true : false" :aria-label="ariaLabel" :class="classList">
		<slot />
	</button>
</template>
<script lang="ts" setup>
interface Props {
	ariaLabel: string
	disabled?: boolean
	classList?: string
}

defineProps<Props>()
</script>
