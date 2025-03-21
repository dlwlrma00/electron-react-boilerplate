const colors = require('tailwindcss/colors');
const flowbite = require("flowbite-react/tailwind");


module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}', flowbite.content(),],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [flowbite.plugin(), require('flowbite-typography')],
};