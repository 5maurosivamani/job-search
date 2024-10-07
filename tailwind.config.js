/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          text: "#fff", // white
          bg: "#242424", // black
        },
        secondary: {
          text: "#242424", // black
          bg: "rgb(22 163 74)", // green
        },
        info: "rgb(14 165 233)",
        warning: {
          600: "rgb(234 88 12)",
          700: "rgb(194 65 12)",
        },
        success: "rgb(22 163 74)",
      },
    },
  },
  plugins: [require("daisyui")],
};
