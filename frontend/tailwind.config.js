/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				ugared: {
					100: "#B91433",
					200: "#BA253C",
					300: "#E44040",
					400: "#943E3E",
					500: "#DA3D3D",
				},
				ugagrey: {
					100: "#4F4941",
					200: "#252525",
				},
				ugatan: {
					100: "#F9DEC9",
				},
			},
		},
	},
	plugins: [],
	// corePlugins: {
	// 	preflight: false, // <== disable this if you dont want tailwind to remove most of the annoying default styles
	// },
};
