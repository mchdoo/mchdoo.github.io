/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{svelte,html}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Migra', 'serif'],
				sans: ['Neue Montreal', 'sans-serif']
			},
			colors: {
				foreground: '#f7f7f7',
				background: '#060607',
				accent: '#BAA218'
			},
			animation: {
				'spin-slow': 'spin 10s ease-in-out infinite'
			}
		}
	},
	plugins: []
};
