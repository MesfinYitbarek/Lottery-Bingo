/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
 },
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix:'tw-',
  theme: {
    extend: {},
  },
  plugins: [],
}