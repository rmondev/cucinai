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
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100px)' },      // 🚫 no opacity here
          '100%': { transform: 'translateY(110vh)' }      // 🚫 no opacity here
        },
      },
      animation: {
        fall: 'fall linear infinite',
      },
    },

  },
  plugins: [],
};
