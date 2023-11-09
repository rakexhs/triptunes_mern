/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bla': '#737373',
        'blb': '#030712',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    //...
  ],
}