/// <reference types="vitest" />
/// <reference types="vite/client" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(() => ({
	root: '.',

	server: {
		port: 3000,
		host: true,
		strictPort: true,
		hmr: {
			port: 3010
		}
	},

	resolve: {
		tsconfigPaths: true
	},

	plugins: [
		react(),
		svgr({
			include: '**/*.svg'
		}),
		tailwindcss()
	],

	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['setupTest.ts'],
		coverage: {
			provider: 'istanbul'
		}
	}
}))
