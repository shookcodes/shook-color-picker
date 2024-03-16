<template>
	<div ref="marker" class="color-marker" aria-label="selected color marker"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface Emits {
	(e: 'setMarker', value: HTMLDivElement): void
}

const emit = defineEmits<Emits>()

const marker = ref()

onMounted(() => {
	emit('setMarker', marker.value)
})
</script>
<style lang="scss" scoped>
.color-marker {
	position: absolute;
	display: none;
	width: 8px;
	height: 8px;
	top: 0;
	right: 0;
	caret-color: transparent;
	border-radius: 100%;
	background: #000000;
}
</style>
