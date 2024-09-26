/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor: "hsl(12, 88%, 59%)",
      },
      fontFamily: {
        Poppins: "Poppins , system-ui",
      },
    },
  },
  plugins: [require("daisyui")],
};
