/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1600px',
    },
    colors: {
      transparent: 'transparent',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      green: {
        'main': '#043730',
        'sub': '#718f89',
      },
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      gray: {
        'main': '#e4e0da',
        'light': '#f4f1ec',
        'text': '#393938'
      },
    },
    fontFamily: {
      sans: ['Readex Pro', ...defaultTheme.fontFamily.sans],
    },
    opacity: {
      '0': '0',
      '20': '0.2',
      '40': '0.4',
      '60': '0.6',
      '80': '0.8',
      '100': '1',
    },
    darkMode: ['class', '[data-mode="dark"]'],
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
