export function _scrubHex(hex: string) {
	if (hex.charAt(0) === '#') {
		return (hex = hex.slice(1))
	}
	return hex
}
