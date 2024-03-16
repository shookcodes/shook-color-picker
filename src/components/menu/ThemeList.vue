<template>
	<fieldset id="settings-option-theme" class="flex flex-col">
		<legend>Theme</legend>
		<div class="theme-group" ref="themeGroup">
			<div class="theme-group-item">
				<input
					type="radio"
					id="radio-theme-dark"
					@input="handleUpdateTheme('dark')"
					name="theme-select" /><label for="theme-dark">Dark</label>
			</div>
			<div class="theme-group-item">
				<input
					type="radio"
					id="radio-theme-light"
					@input="handleUpdateTheme('light')"
					name="theme-select" /><label for="theme-light">Light</label>
			</div>
		</div>
	</fieldset>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import { $theme, setTheme } from '@store/settings'
import type { ColorPickerThemeOption } from '@store/types'

import { useStore } from '@nanostores/vue'

const theme = useStore($theme)

const themeGroup = ref()

const handleUpdateTheme = (value: ColorPickerThemeOption) => {
	setTheme(value)
}

onMounted(() => {
	const initialThemeEl =
		themeGroup.value && themeGroup.value.querySelector(`#radio-theme-${theme.value}`)
	initialThemeEl.checked = true
})
</script>
<style lang="scss" scoped>
#settings-option-theme {
	@apply flex px-3  text-indigo-800 transition-colors;

	span {
		@apply border-t border-neutral-300 pt-2 font-semibold;
	}

	& .theme-group {
		@apply flex flex-col gap-0.5;

		& .theme-group-item {
			@apply flex items-center gap-1.5;
		}
	}
}
</style>
