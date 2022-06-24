module.exports = {
  purge: [
    './components/*.vue'
    , './pages/*.vue'
    , './pages/**/*.vue'
    , './pages/**/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#2F303A',
          '400': '#383943',
        },
        blue: {
          'dark': '#112F69'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
