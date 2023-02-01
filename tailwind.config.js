const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fg: {
          DEFAULT: colors.slate[800],
          light: colors.slate[700], // light here means light weight, not light color
        },
        bg: {
          DEFAULT: colors.slate[200],
          focus: colors.slate[100],
          focus2: colors.slate[300],
        },
        line: {
          DEFAULT: colors.slate[400],
          focus: colors.slate[500],
        },
        code: colors.slate[300],
      }
    },
  },
  plugins: [],
}
