import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */


export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
  content: [
    flowbite.content(),
  ]
}


