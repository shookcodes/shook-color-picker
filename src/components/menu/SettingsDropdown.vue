<template>
	<div ref="dropdown" class="settings-dropdown-wrapper" :class="`theme-${theme}`">
		<Button
			ariaLabel="click to toggle color picker settings"
			className="button-menu-bar settings-button"
			id="settings-menu-toggle-button"
			@click="showMenu = !showMenu"
			><SettingsSvg name="settings" class="icon"
		/></Button>

		<div
			ref="dropdown"
			aria-hidden="true"
			class="settings-dropdown transition-all duration-300"
			:class="showMenu ? 'z-0' : 'pointer-events-none z-10 opacity-0'">
			<li id="settings-option-hex" class="settings-dropdown-li">
				<CheckBox
					id="hex-toggle-checkbox"
					:selected="formats.hex"
					name="hex"
					label="Hex"
					@set-selected="(value, format) => updateFormats.colorModel({ format, value })" />
			</li>
			<li id="settings-option-rgb" class="settings-dropdown-li">
				<CheckBox
					id="rgb-toggle-checkbox"
					:selected="formats.rgb"
					name="rgb"
					label="RGB"
					@set-selected="(value, format) => updateFormats.colorModel({ format, value })" />
			</li>
			<li id="settings-option-hsl" class="settings-dropdown-li">
				<CheckBox
					id="hsl-toggle-checkbox"
					:selected="formats.hsl"
					name="hsl"
					label="HSL"
					@set-selected="(value, format) => updateFormats.colorModel({ format, value })" />
			</li>
			<li id="settings-option-cmyk" class="settings-dropdown-li">
				<CheckBox
					id="cmyk-toggle-checkbox"
					:selected="formats.cmyk"
					name="cmyk"
					label="CMYK"
					@set-selected="(value, format) => updateFormats.colorModel({ format, value })" />
			</li>

			<li id="settings-option-palette" class="settings-dropdown-li">
				<CheckBox
					id="palette-toggle-checkbox"
					:selected="showPalette"
					name="palette"
					label="Show Palette"
					@set-selected="(value) => updateShowPalette(value)" />
			</li>
			<ThemeToggle />
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import Button from '@global/Button.vue'
import CheckBox from '@global/CheckBox.vue'
import SettingsSvg from '@icons/settings.svg?component'
import {
	$selectedFormats,
	$showPalette,
	$theme,
	updateShowPalette,
	updateFormats
} from '@store/settings'
import { useStore } from '@nanostores/vue'
import type { ColorFormatOption } from '../../types'

interface Props {
	className?: string
}

defineProps<Props>()

const theme = useStore($theme)

const formats = useStore($selectedFormats)
const showPalette = useStore($showPalette)

const showMenu = ref(false)
const toggleButton = ref()
const dropdown = ref()

const handleToggleMenuClick = (e: MouseEvent) => {
	if (e.target === toggleButton.value) {
		return
	} else if (showMenu.value === true) {
		if (dropdown.value && !dropdown.value.contains(e.target)) {
			showMenu.value = false
		}
	}
}

onMounted(() => {
	toggleButton.value = document.querySelector('#settings-menu-toggle-button')
	document.addEventListener('click', (e) => handleToggleMenuClick(e))
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.settings-dropdown-wrapper {
	@apply relative flex w-full items-center justify-end;
}

.settings-dropdown {
	background: rgba($light, 0.95);
	@apply absolute top-1 mt-6 flex w-max flex-col gap-2 rounded-md   py-2 text-indigo-800 shadow-md transition-all;
}

.settings-dropdown-li {
	@apply relative z-10 flex items-center gap-2 px-3  transition-colors;

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

.theme-dark {
	.settings-dropdown {
		background: rgba($dark, 0.95);
		@apply text-indigo-300;
	}

	.settings-dropdown-li {
		&:hover {
			&::after {
				@apply bg-indigo-800;
			}
		}
	}
}
</style>
