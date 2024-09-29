/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx}"],
	theme: {
	  extend: {
		keyframes: {
		  slideIn: {
			'0%': { transform: 'translateY(-100%)', opacity: '0' },
			'100%': { transform: 'translateY(0)', opacity: '1' },
		  },
		},
		animation: {
		  slideIn: 'slideIn 0.5s ease-out',
		},
	  },
	},
	plugins: [],
  };
  