/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				ugared: {
					100: "#B91433",
					200: "#BA253C",
				},
				ugagrey: {
					100: "#4F4941",
					200: "#252525",
				},
			},
		},
	},
	plugins: [],
	// corePlugins: {
	// 	preflight: false, // <== disable this if you dont want tailwind to remove most of the annoying default styles
	// },
};
