/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./*.{html,js}", "./src/**/*.{html,js}"],
  content: ["./src/**/*.{html,js}", "./*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dm-text": "#EEEEEE",
        "dm-back": "#222831",
        "dm-front": "#31363F",
        "dm-help": "#76ABAE",
      },
    },
  },
  plugins: [require("tailwind-hamburgers")],
};
