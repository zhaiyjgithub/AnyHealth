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
        'secondary': '#739CB1',
        'secondary-focus': '#58789B',
        'bgContent': '#FAF7F5',
        'bg-gray': '#FAF7F5',
        'base-black': '#181A2A',
        'green': '#007645',
        'light-gray': '#5E5E5E'
      }),
      textColor:  theme => ({
        ...theme('colors'),
        'primary': '#4E70F7',
        'primary-focus': '#1F4BF6',
        'base-black': '#181A2A',
        'base-green': '#007645',

      }),
      borderColor: theme => ({
        'primary': '#4E70F7',
        'primary-focus': '#1F4BF6',
        'base-black': '#181A2A',
        'base-green': '#007645',
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
