/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        flipkartBlue: '#2874f0', 
        flipkartYellow: '#ffe500',
        pageBackground: '#f1f3f6'
      }
    },
  },
  plugins: [],
}