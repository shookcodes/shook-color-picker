<template>
	<div class="color-inputs">
		<ColorInput
			ariaLabel="selected hex code value"
			title="Hex"
			id="input-hex"
			:color="store.hex"
			:ariaHidden="formats.hex ? false : true"
			:className="formats.hex ? '' : 'hide-color-input'" />
		<ColorInput
			ariaLabel="selected RGB code value"
			title="RGB"
			id="input-rgb"
			:color="store.rgb"
			:ariaHidden="formats.rgb ? false : true"
			:className="formats.rgb ? '' : 'hide-color-input'" />
		<ColorInput
			ariaLabel="selected HSL code value"
			title="HSL"
			id="input-hsl"
			:color="store.hsl"
			:ariaHidden="formats.hsl ? false : true"
			:className="formats.hsl ? '' : 'hide-color-input'" />
		<ColorInput
			ariaLabel="selected CMYK code value"
			title="CMYK"
			id="input-cmyk"
			:color="store.cmyk"
			:ariaHidden="formats.cmyk ? false : true"
			:className="formats.cmyk ? '' : 'hide-color-input'" />
	</div>
</template>
<script lang="ts" setup>
import ColorInput from '@global/ColorInput.vue'
import { $currentColor } from '@store/colors'
import { $selectedFormats } from '@store/settings'
import { useStore } from '@nanostores/vue'

const store = useStore($currentColor)

const formats = useStore($selectedFormats)
</script>
<style lang="scss" scoped>
.color-inputs {
	gap: 1.75rem;
	@apply flex flex-col gap-2.5;
}

.hide-color-input {
	@apply hidden;
}
</style>
