/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Playfair Display"', 'serif'],
        // or create a custom name like:
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
