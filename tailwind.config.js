/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green,
      },
      fontFamily: {
        monserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
