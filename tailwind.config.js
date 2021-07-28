module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {

    },
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#4E70F7',
        'primary-focus': '#1F4BF6',
        'Secondary': '#739CB1',
        'bgContent': '#FAF7F5',
        'baseBlack': '#181A2A',
        'base-black': '#181A2A',
        'green': '#007645',
        'light-gray': '#5E5E5E'
      }),
      textColor:  theme => ({
        ...theme('colors'),
        'primary': '#4E70F7',
        'primary-focus': '#1F4BF6',
        'baseBlack': '#181A2A',

      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
