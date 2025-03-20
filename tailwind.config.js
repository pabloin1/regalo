/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Paleta de colores pastel inspirada en Tinker Bell
          'tink-green': '#BDECD7',
          'tink-yellow': '#FFF4BD',
          'tink-pink': '#FFCAD4',
          'tink-blue': '#C7E9F4',
          'tink-purple': '#E2CCFF',
          'tink-gold': '#FFE6A7',
        },
        fontFamily: {
          'fairy': ['Pacifico', 'cursive'],
          'poppins': ['Poppins', 'sans-serif'],
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'sparkle': 'sparkle 2s linear infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'wiggle': 'wiggle 2s ease-in-out infinite',
          'rotate-slow': 'rotate 8s linear infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          sparkle: {
            '0%, 100%': { opacity: 0, transform: 'scale(0.5)' },
            '50%': { opacity: 0.8, transform: 'scale(1.2)' },
          },
          wiggle: {
            '0%, 100%': { transform: 'rotate(-1deg)' },
            '50%': { transform: 'rotate(1deg)' },
          },
          rotate: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          }
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
        backdropBlur: {
          'xs': '2px',
        },
      },
    },
    plugins: [],
  }