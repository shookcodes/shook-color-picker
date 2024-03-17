<template>
	<div class="color-input" :class="className">
		<label :for="id" class="color-input-label" aria-label="">{{ title }}</label>

		<span class="relative"
			><input
				ref="inputRef"
				type="text"
				aria-label="ariaLabel"
				:aria-hidden="hideAria"
				:id="id"
				class="color-input-field"
				:value="color"
		/></span>
		<div ref="copyButtonRef" class="input-button-wrapper">
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
	// inputClassName?: string
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

.input-button-wrapper {
	transition: opacity 0.3s ease-in-out;
	button {
		@apply origin-top transition-all ease-in-out;
	}
}

.message-span {
	transition: opacity 0.3s ease-in-out;

	@apply pointer-events-none absolute right-2 top-4 z-10 mt-3 cursor-default text-sm font-semibold
			caret-transparent;
}

.hidden-text-input {
	& .input-button-wrapper button {
		@apply scale-y-0;
	}
}

input[type='text'] {
	outline: 1px solid #cccccc;
}

.color-input {
	z-index: auto;
	@apply relative z-0 h-14 transition-all ease-linear;

	& label {
		caret-color: transparent;
		z-index: -1;
		@apply text-sm transition-opacity delay-75 ease-in-out;
	}

	& input {
		border-radius: 6px;
		font-size: 0.95rem;
		@apply z-10 h-7 w-full origin-top px-1.5 transition-all ease-in-out;
	}

	&.hidden-text-input {
		z-index: -1;
		@apply -mt-14;

		label {
			@apply opacity-0 delay-0;
		}

		input {
			@apply origin-top scale-y-0 opacity-0 transition-all;
		}
	}
}

.theme-dark {
	input[type='text'] {
		outline: 1px solid #161616;
		background: $dark;
		@apply outline-neutral-600;
	}
}
</style>
