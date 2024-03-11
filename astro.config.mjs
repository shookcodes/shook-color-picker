import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import svgLoader from 'vite-svg-loader'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), icon(), vue(), react()],
	vite: {
		plugins: [svgLoader()]
	}
})
