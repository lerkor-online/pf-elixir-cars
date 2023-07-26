/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        hdm: { max: "1116px" },
        h935: { max: "935px" },
        h742: { max: "742px" },
        h730: { max: "730px" },
        h500: { max: "500px" },
      },
      spacing: {
        100: "100px",
        120: "120px",
        144: "144px",
      },
      animation: {
        "pulse-gradient": "pulse-gradient 0.5s",
      },
      keyframes: {
        "pulse-gradient": {
          "0%": {
            "box-shadow": "0 0 0 0 rgba(255, 215, 0, 0.5)",
            trasform: "scale(1)",
          },
          "70%": {
            "box-shadow": "0 0 0 5px rgba(255, 225, 0, 0.7)",
            transform: "scale(1.15)",
          },
          "100%": {
            "box-shadow": "0 0 0 0x rgba(255, 215, 0, 0.1)",
            trasform: "scale(1)",
          },
        },
      },
    },
    plugins: [],
  },
};
