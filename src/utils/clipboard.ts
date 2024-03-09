const copyContent = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
	} catch (err) {
		console.error('Failed to copy: ', err)
	}
}

export { copyContent }
