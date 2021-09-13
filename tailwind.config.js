const { fontFamily, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./apps/**/*.{html,ts,scss}', './libs/**/*.{html,ts,scss}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Open Sans', ...fontFamily.sans],
    },
    colors: {
      blue: colors.blue,
      pink: colors.pink,
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      neutral: {
        DEFAULT: 'var(--neutral)',
        light: 'var(--light-neutral)',
        dark: 'var(--dark-neutral)',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
