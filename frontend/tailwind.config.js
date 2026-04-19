/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- This ensures it reads your App.jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}