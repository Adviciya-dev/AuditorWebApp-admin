/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stroke/soft-200': '#E2E4E9',
        'text-soft-400': '#868C98',
      }
    },
  },
  plugins: [],
}