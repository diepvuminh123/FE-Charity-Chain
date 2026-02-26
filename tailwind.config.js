/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',  // orange
          light: '#FED7AA',
          dark: '#EA580C',
        },
        secondary: {
          DEFAULT: '#0EA5E9',  // sky blue
          dark: '#0284C7',
        },
        success: '#22C55E',     // green
        brand: {
          blue: '#0EA5E9',
          orange: '#F97316',
          green: '#22C55E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
