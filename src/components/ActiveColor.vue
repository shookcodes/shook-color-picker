<template>
	<div class="active-color-wrapper">
		<div class="active-color-preview" :style="{ background: hex }"></div>
		<Button
			:disabled="disabled"
			ariaLabel="add the color to the color palette"
			className="button-add-active-color "
			>Add Color
			<AddSvg />
		</Button>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Button from '../components/global/Button.vue'
import AddSvg from '../icons/add.svg?component'
import { useStore } from '@nanostores/vue'
import { $currentColor } from '../store/colors'
interface Props {}

const color = useStore($currentColor)

const hex = computed(() => color.value.hex)

const disabled = computed(() => (hex.value ? false : true))
</script>
<style lang="scss" scoped>
.active-color-wrapper {
	@apply relative flex h-11 items-center gap-4 border-t  border-neutral-300 pt-3;
}

.button-disabled {
	@apply absolute bottom-0 right-0 min-w-full;
}

.active-color-preview {
	@apply h-7 w-full flex-shrink rounded-md  shadow-sm transition-all;
}
</style>
