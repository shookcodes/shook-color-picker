const copyContent = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)

		const res = 'copied!'
		return res
	} catch (err) {
		console.error('Failed to copy: ', err)
	}
}

export { copyContent }
