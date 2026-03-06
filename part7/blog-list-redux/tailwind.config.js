/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navbar: '#000405',
        body: '#00161b',
      },
    },
  },
  plugins: [],
}
