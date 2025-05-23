import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/components/**/*.{js,jsx,ts,tsx}",
    "./app/routes/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        'weather-primary': '#00668A',
        'weather-secondary': '#004E71',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
