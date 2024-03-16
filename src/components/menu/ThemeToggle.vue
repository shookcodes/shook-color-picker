<template>
	<fieldset id="settings-option-theme" class="flex flex-col">
		<legend class="border-top w-full pb-2 font-semibold">Theme</legend>
		<div class="theme-group" ref="themeGroup">
			<Radio
				id="radio-theme-dark"
				ariaLabel="dark option for theme"
				name="theme-select"
				:selected="theme === 'dark' ? true : false"
				label="Dark"
				value="dark"
				@click="(value) => updateSelectedTheme(value)" />
			<Radio
				id="radio-theme-light"
				ariaLabel="light option for theme"
				name="theme-select"
				:selected="theme === 'light' ? true : false"
				label="Light"
				value="light"
				@click="(value) => updateSelectedTheme(value)" />
		</div>
	</fieldset>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Radio from '@global/Radio.vue'
import { $theme, setTheme } from '@store/settings'
import type { ColorPickerThemeOption } from '@store/types'

import { useStore } from '@nanostores/vue'

const theme = useStore($theme)

const themeGroup = ref()

const updateSelectedTheme = (value: ColorPickerThemeOption) => {
	setTheme(value)
}
</script>
<style lang="scss" scoped>
#settings-option-theme {
	@apply flex px-3 text-inherit transition-colors;

	& .theme-group {
		@apply flex flex-col gap-0.5;
	}
}

.theme-dark {
	.border-top {
		@apply border-neutral-700;
	}
}
</style>
