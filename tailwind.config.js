module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {

    },
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#4800c2',
        'Secondary': '#F59fbc',
        'bgContent': '#FAF7F5',
      }),
      textColor:  theme => ({
        ...theme('colors'),
        'primary': '#4800c2',
        'baseBlack': '#2A1333',

      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
