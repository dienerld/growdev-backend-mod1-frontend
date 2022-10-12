/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/app/pages/**/*.tsx',
  ],
  theme: {
    screens: {
      sm: '600px',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  important: true,
};
