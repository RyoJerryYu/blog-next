const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fg: {
          DEFAULT: colors.slate[700],
          light: colors.slate[500], // light here means light weight, not light color
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
        codeblock: {
          DEFAULT: colors.slate[900],
          text: colors.slate[200], // for default that plain text highlighted
          titletext: colors.slate[100], // for title of code block
          titlebg: colors.slate[900], // for title of code block
          highlightedbg: colors.slate[500], // for highlighted code block
          colored: {
            a: colors.emerald[500],
            b: colors.indigo[500],
            c: colors.orange[500],
            d: colors.sky[500],
            e: colors.fuchsia[500],
            f: colors.lime[500],
          }
        },
        codeinline: {
          DEFAULT: colors.slate[400],
          text: colors.slate[700],
        }
      },
    },
  },
  plugins: [],
};
