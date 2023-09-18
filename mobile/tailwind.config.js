/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FC5631',
          accent: '#5D3CF2',
          success: '#07C98B',
          danger: '#F23C49',
          warning: '#FCBC31',
          info: '#3C76F2',
          darkgreen: '#4CBBC6',
          darkpurple: '#654DEE',
          darkwhite: '#3A3C41',
          lightgreen: '#E6F9F2',
          lightpurple: '#BDC3FF',
          lightgray: '#DDE3E6',
          lightred: '#FAD5E1',
          lightyellow: '#F8F0CC',
          black: '#000000',
          black: {
            800: '#1F222A',
            900: '#181A20',
          },
          gray: {
            100: '#F9F8FA',
            200: '#F5F4F8',
            300: '#EFECF3',
            400: '#D5D2DC',
            500: '#BBB7C5',
            600: '#9691A4',
            700: '#666276',
            800: '#454056',
            900: '#1F1B2D',
          },
        },
      },
    },
  },
  plugins: [],
}
