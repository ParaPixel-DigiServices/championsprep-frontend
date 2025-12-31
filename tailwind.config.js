/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFFF0",
        navy: {
          DEFAULT: "#0B0033",
          light: "#1A1A40",
        },
        accent: "#6D54FF",
      },
      fontFamily: {
        sans: ['"Manrope"', "sans-serif"],
        serif: ['"Source Serif 4"', "serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(90deg, #1A0B2E 0%, #4F28AB 100%)",
        "primary-gradient-hover":
          "linear-gradient(90deg, #24103E 0%, #5B32C2 100%)",

        "banner-gradient":
          "linear-gradient(105deg, #0F0838 0%, #1A0B2E 40%, #4F28AB 100%)",
      },
    },
  },
  plugins: [],
};
