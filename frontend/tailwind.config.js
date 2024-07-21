/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"], // Ensure this path is correct
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Include jsx for React components
  theme: {
    extend: {
      keyframes: {
        bigToSmall: {
          "0%, 100%": { transform: "scale(1.4)" },
          "50%": { transform: "scale(0.5)" },
        },
      },
      animation: {
        bigToSmall: "bigToSmall 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
