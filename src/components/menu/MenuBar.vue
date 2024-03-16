<template>
	<div class="menu-bar" :class="`theme-${theme}`">
		<div class="menu-items background background-small">
			<SettingsDropdown className="background" />
		</div>
	</div>
</template>

<script setup lang="ts">
import SettingsDropdown from './SettingsDropdown.vue'
import { useStore } from '@nanostores/vue'
import { $theme } from '@/store/settings'

const theme = useStore($theme)
</script>
<style lang="scss" scoped>
@import '../../styles/variables.scss';

.menu-bar {
	@apply absolute -top-7 right-0 z-10 flex w-full items-center justify-end;

	.menu-items {
		@apply relative flex items-center;
	}
}
</style>
