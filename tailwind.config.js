/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ostt: '"Old Standard TT", serif',
      },
      colors: {
        primary: "#F1AC85",
        "primary-hover": "#d99b78",
        secondary: "#444444",
      },
    },
  },
  plugins: [require("daisyui")],
}
