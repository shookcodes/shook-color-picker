<template>
	<div class="color-input" :class="className">
		<label class="color-input-label">
			<span class="label-title">{{ title }}</span>
			<input
				ref="inputRef"
				type="text"
				aria-label="ariaLabel"
				:aria-hidden="hideAria"
				id="id"
				class="color-input-field"
				:value="color"
		/></label>
		<div ref="copyButtonRef" class="copy-button-wrapper">
			<Button
				ariaLabel="copy the selected hex value"
				className="button-icon button-input-copy"
				@clicked="copyInputValue"
				><CopyIcon
			/></Button>
		</div>
		<span ref="messageRef" class="message-span"></span>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from '@global/Button.vue'
import CopyIcon from '@icons/copy.svg?component'
import { copyContent } from '@utils/clipboard'
import '@styles/typography.scss'

interface Props {
	title: string
	ariaLabel: string
	id: string
	ariaHidden?: boolean
	color?: string
	className?: string
}

const { color, ariaHidden } = defineProps<Props>()

const input = ref()
const hideAria = computed(() => ariaHidden || false)

const copyButtonRef = ref()

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
	setTimeout(() => {
		copyButtonRef.value.ariaHidden = true
		copyButtonRef.value.classList.add('opacity-0')

		messageRef.value.ariaHidden = false
		messageRef.value.classList.remove('opacity-0')
	}, 200)

	setTimeout(() => {
		copyButtonRef.value.classList.remove('opacity-0')

		messageRef.value.classList.add('opacity-0')
	}, 2000)

	setTimeout(() => {
		copyButtonRef.value.ariaHidden = false

		messageRef.value.ariaHidden = true
		messageRef.value.classList.remove('error-text', 'success-text')
	}, 4000)
}
</script>
<style lang="scss" scoped>
@import '../../styles/typography.scss';

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

.copy-button-wrapper {
	transition: opacity 0.3s ease-in-out;
}

.message-span {
	transition: opacity 0.3s ease-in-out;

	@apply pointer-events-none absolute right-2 top-4 z-10 mt-1.5 cursor-default text-sm font-semibold
			caret-transparent;
}
</style>
