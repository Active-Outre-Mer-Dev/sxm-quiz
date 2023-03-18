const theme = require("./theme.json");
const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      ...theme.color,
      ...theme.palette,
      zinc: {
        ...colors.zinc
      },
      emerald: {
        ...colors.emerald
      },
      orange: {
        ...colors.orange
      },
      rose: {
        ...colors.rose
      }
    },
    fontFamily: {
      sans: ["var(--font-sans)"]
    }
  },
  plugins: []
};
