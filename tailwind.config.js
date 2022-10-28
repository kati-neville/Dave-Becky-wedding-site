module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			sans: ["Montaga", "serif"],
			"sans-body": ["Poppins", "sans"],
		},

		extend: {
			colors: {
				gold: "#D4AF37",
			},
			keyframes: {
				zoom: {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(0.5)" },
					"100%": { transform: "scale(1)" },
				},
			},
			animation: {
				zoom: "zoom 3s ease-in-out infinite",
			},
		},
	},
	plugins: [],
};
