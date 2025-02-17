/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#074498',
        'brand-secondary': '#cbae37',
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
      },
      animation: {
        slideUp: 'slideUp 1s ease-out',
      },
    },
    keyframes: {
      slideUp: {
        '0%': { opacity: 0, transform: 'translateY(30px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  },
  plugins: [],
};
