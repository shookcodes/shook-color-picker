<template>
	<div class="color-input">
		<label class="color-input-label">
			<span class="label-title">{{ title }}</span>
			<input
				ref="inputRef"
				type="text"
				aria-label="ariaLabel"
				id="id"
				class="color-input-field"
				:value="color"
		/></label>
		<Button
			ariaLabel="copy the selected hex value"
			className="button-icon button-input-copy"
			@clicked="copyInputValue"
			><CopyIcon
		/></Button>
		<span ref="messageRef" class="message-span opacity-0"></span>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Button from '@global/Button.vue'
import CopyIcon from '@icons/copy.svg?component'
import { copyContent } from '@utils/clipboard'

interface Props {
	title: string
	ariaLabel: string
	id: string
	color?: string
}

const { color } = defineProps<Props>()

const input = ref()

const messageRef = ref()
const copyInputValue = async () => {
	const copied = await copyContent(input.value)

	if (copied) {
		messageRef.value.classList.add('success-text')
		messageRef.value.innerText = 'Copied!'
	} else {
		messageRef.value.classList.add('error-text')
		messageRef.value.innerText = 'Error copying'
	}
	messageRef.value.classList.remove('opacity-0')
	setTimeout(() => {
		messageRef.value.classList.add('opacity-0')
	}, 3000)

	setTimeout(() => {
		messageRef.value.classList.remove('error-text', 'success-text')
		messageRef.value.innerText = ''
	}, 4000)
}
</script>
<style lang="scss" scoped>
.color-input {
	@apply relative;
}

.color-input-label {
	@apply flex flex-col gap-0.5;

	& span {
		caret-color: transparent;
		@apply text-xs;
	}
}

.color-input-field {
	border: 1px solid #ccc;
	z-index: 1;
	height: 1.8rem;
	padding: 0 0.5rem;
	border-radius: 6px;
	font-size: 0.95rem;
}

.message-span {
	transition: opacity 0.2s ease-in-out;

	@apply absolute right-0 top-12 z-10 mt-1.5 text-sm
			font-semibold;
}
</style>
