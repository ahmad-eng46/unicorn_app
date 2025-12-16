/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b52eb',
        'primary-dark': '#4840d1',
        'baby-unicorn': '#fbbf24',
        'mature-unicorn': '#10b981',
        'old-unicorn': '#8b5cf6',
      },
    },
  },
  plugins: [],
}
