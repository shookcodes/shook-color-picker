<template>
	<button class="palette-item" :style="{ background: color.hex }"></button>
</template>
<script setup lang="ts">
import type { ColorObject } from '@/types'

interface Props {
	color: ColorObject
}

defineProps<Props>()
</script>
<style scoped lang="scss">
.palette-item {
	@apply aspect-square w-full min-w-[2rem] rounded border-2 border-neutral-50 shadow-md transition-all duration-300 ease-in-out hover:scale-110;
}
</style>
