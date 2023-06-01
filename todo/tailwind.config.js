/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'logbg':"#E0DFE0",
        'navbar':"#2465CF",
        'navHov':"#005A9E",
        'dayText':"#AEADAC"
      }
    },
  },
  plugins: [],
}