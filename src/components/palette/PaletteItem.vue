<template>
	<div class="palette-item"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@nanostores/vue'
import { $colorPalette } from '@/store/colors'
const paletteColors = useStore($colorPalette)

const palette = computed(() => paletteColors.value)
</script>
<style scoped lang="scss">
.paletteItem {
	@apply h-10 w-10;
}
</style>
