const { fontFamily, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./apps/**/*.{html,ts,scss}', './libs/**/*.{html,ts,scss}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Open Sans', ...fontFamily.sans],
      // sans: ['Quicksand', ...fontFamily.sans],
    },
    extend: {
      height: {
        'with-offset-top': 'calc(100% - var(--offset-top))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
