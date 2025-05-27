/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          coffee: {
            cream: '#f5f0e6',
            latte: '#d7b899',
            mocha: '#b06e45',
            espresso: '#362211',
            foam: '#faf3e0',
          },
        },
        fontFamily: {
          quicksand: ['Quicksand', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  