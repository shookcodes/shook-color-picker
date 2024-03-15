<template>
	<div class="active-color">
		<div class="active-color-grid">
			<div class="active-color-preview" :style="{ background: hex }"></div>
			<Button
				ref="addButtonRef"
				:disabled="disabled"
				ariaLabel="add the color to the color palette"
				className="button-add-active-color "
				@click="addColorToPalette"
				>Add Color
				<AddSvg />
			</Button>
			<span
				ref="errorSpan"
				class="active-color-message error-text"
				:class="error ? 'opacity-1' : 'opacity-0'"
				aria-disabled="true"
				>Color already on palette</span
			>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Button from '../components/global/Button.vue'
import AddSvg from '../icons/add.svg?component'
import { useStore } from '@nanostores/vue'
import { $currentColor, updatePalette } from '../store/colors'
import { $showPalette } from '../store/settings'

const color = useStore($currentColor)
const showPalette = useStore($showPalette)

const hex = computed(() => color.value.hex)

const addButtonEl = ref()
const addButtonRef = ref()

const disabled = computed(() => (hex.value ? false : true))

const errorSpan = ref()
const error = ref(false)

const setShowButton = (show: boolean) => {
	if (show === true) {
		addButtonEl.value.style.marginRight = '0'
		addButtonEl.value.style.marginLeft = '8px'
		setTimeout(() => {
			addButtonEl.value.classList.remove('button-hidden')
		}, 200)
	} else {
		addButtonEl.value.classList.add('button-hidden')
		addButtonEl.value.style.marginLeft = '0'
		setTimeout(() => {
			addButtonEl.value.style.marginRight = '-120%'

			addButtonEl.value.style.width = '0'
		}, 200)
	}
}

watch(showPalette, (show) => {
	setShowButton(show)
})

onMounted(() => {
	addButtonEl.value = addButtonRef.value.buttonRef
	setShowButton(showPalette.value)
})

const addColorToPalette = () => {
	const res = updatePalette.add()

	if (res === 'duplicate') {
		error.value = true
		errorSpan.value.ariaDisabled = false
		setTimeout(() => {
			error.value = false
			errorSpan.value.ariaDisabled = true
		}, 2000)
	}
}
</script>
<style lang="scss" scoped>
@import '../styles/variables.scss';
.active-color {
	@apply relative z-10;
}

.active-color-grid {
	@apply relative flex h-11 items-center;
}

.active-color-message {
	@apply absolute -bottom-4 w-full text-center text-sm font-semibold transition-opacity;
}

.button-disabled {
	@apply absolute bottom-0 right-0 min-w-full;
}

.active-color-preview {
	@apply h-7 w-full flex-1 rounded-md  shadow-sm transition-all ease-in-out;
}
</style>
