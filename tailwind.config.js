/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sun-orange': '#FFA500',
        'dark-blue': '#1A1A40',
        'soft-yellow': '#FFD700',
        'teal-blue': '#008080',
        'deep-purple': '#3B3B98',
        'midnight': '#121063',
        'startup-blue': '#4337FE',
        'pastel-orange': '#FFB347',
        'midnight-blue': '#2C3E50',
        'soft-lavender': '#A29BFE',
      },
    },
  },
  plugins: [],
}