/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'mdd': '880px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [
   
  ],
}