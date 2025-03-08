const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fg: {
          DEFAULT: colors.slate[700],
          light: colors.slate[600], // light here means light weight, not light color
        },
        bg: {
          DEFAULT: colors.slate[50],
          focus: colors.slate[100],
          focus2: colors.slate[200],
        },
        border: {
          DEFAULT: colors.slate[400],
          focus: colors.slate[500],
        },
        code: {
          DEFAULT: colors.slate[200],
          lineno: colors.slate[400],
        },
      },
    },
  },
  plugins: [],
};
