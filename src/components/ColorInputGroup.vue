<template>
	<div class="color-inputs">
		<ColorInput ariaLabel="selected hex code value" title="Hex" id="input-hex" :color="store.hex" />
		<ColorInput ariaLabel="selected RGB code value" title="RGB" id="input-rgb" :color="store.rgb" />
		<ColorInput ariaLabel="selected HSL code value" title="HSL" id="input-hsl" :color="store.hsl" />
		<ColorInput
			ariaLabel="selected CMYK code value"
			title="CMYK"
			id="input-cmyk"
			:color="store.cmyk" />
	</div>
</template>
<script lang="ts" setup>
import ColorInput from '@global/ColorInput.vue'
import { $currentColor } from '@store/colors'
import { useStore } from '@nanostores/vue'

const store = useStore($currentColor)
</script>
<style lang="scss" scoped>
.color-inputs {
	gap: 1.75rem;
	@apply flex flex-col gap-4;
}
</style>
