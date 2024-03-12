<template>
	<div class="settings-dropdown-wrapper">
		<Button
			ariaLabel="click to toggle color picker settings"
			className="button-menu-bar settings-button"
			id="settings-menu-toggle-button"
			@click="showMenu = !showMenu"
			><SettingsSvg name="settings" class="icon"
		/></Button>

		<ol
			ref="dropdown"
			aria-hidden="true"
			class="settings-dropdown transition-all duration-300"
			:class="showMenu ? 'z-0' : 'pointer-events-none z-10 opacity-0'">
			<li
				id="settings-option-hex"
				class="settings-dropdown-li"
				@click="(e) => handleSettingToggle(e)">
				<CheckBox
					id="hex-toggle-checkbox"
					:checked="settings.hex"
					:checked-style="settings.hex ? '' : '{color: transparent}'"
					name="hex" /><span>Hex</span>
			</li>
			<li
				id="settings-option-rgb"
				class="settings-dropdown-li"
				@click="(e) => handleSettingToggle(e)">
				<CheckBox id="rgb-toggle-checkbox" :checked="settings.rgb" name="rgb" /><span>RGB</span>
			</li>
			<li
				id="settings-option-hsl"
				class="settings-dropdown-li"
				@click="(e) => handleSettingToggle(e)">
				<CheckBox id="hsl-toggle-checkbox" :checked="settings.hsl" name="hsl" /><span>HSL</span>
			</li>
			<li
				id="settings-option-cmyk"
				class="settings-dropdown-li"
				@click="(e) => handleSettingToggle(e)">
				<CheckBox id="cmyk-toggle-checkbox" :checked="settings.cmyk" name="cmyk" /><span>CMYK</span>
			</li>
		</ol>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import Button from '@global/Button.vue'
import CheckBox from '@global/CheckBox.vue'
import SettingsSvg from '@icons/settings.svg?component'
import { $selectedFormats, updateSettings } from '@store/settings'
import type { ColorFormatOption } from '../../types'

import { useStore } from '@nanostores/vue'

const settings = useStore($selectedFormats)

const showMenu = ref(false)
const toggleButton = ref()
const dropdown = ref()

const handleToggleClick = (e: MouseEvent) => {
	if (e.target === toggleButton.value) {
		return
	} else if (showMenu.value === true) {
		if (dropdown.value && !dropdown.value.contains(e.target)) {
			showMenu.value = false
		}
	}
}

const handleSettingToggle = (e: MouseEvent) => {
	const option = e.currentTarget as HTMLLIElement

	const checkbox = option.querySelector('input[type=checkbox]')

	const id = checkbox?.id.split('-')
	if (!id) return console.log('No setting found for the option selected.')

	const format = id[0] as ColorFormatOption

	const value = !settings.value[format]
	updateSettings.colorModel({ format, value })
}

onMounted(() => {
	toggleButton.value = document.querySelector('#settings-menu-toggle-button')
	document.addEventListener('click', (e) => handleToggleClick(e))
})
</script>

<style lang="scss" scoped>
.settings-dropdown-wrapper {
	@apply relative flex w-full items-center justify-end;
}

.settings-dropdown {
	@apply absolute top-0 mt-6 flex w-max flex-col gap-2 rounded-md border border-neutral-200 bg-neutral-100 py-2 shadow-md transition-all;
}

.settings-dropdown-li {
	@apply relative z-10 flex items-center gap-2 px-3 text-indigo-800 transition-colors;

	.checkbox,
	& span {
		@apply pointer-events-none;
	}
	&::after {
		content: '';
		z-index: -1;
		@apply absolute inset-0 mx-auto h-full w-[94%] rounded-md bg-transparent transition-colors;
	}
	&:hover {
		cursor: pointer;
		&::after {
			@apply bg-indigo-200;
		}
	}
}
</style>
