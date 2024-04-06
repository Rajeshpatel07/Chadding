/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
        '130': '40rem',
      },
      width: {
        '128': '32rem',
        '130': '40rem',
        '90': '95rem',
      },
    },
  },
  plugins: [require("daisyui")],
}
