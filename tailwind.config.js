export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zblue': '#00d2ff',
        'zpurple': '#925cff',
        'zdark': '#05070a',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
