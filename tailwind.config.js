/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C8102E',
          dark: '#8E0B20',
          light: '#FF3B5C',
        },
        ink: {
          900: '#0B1220',
          800: '#111827',
          700: '#1F2937',
          500: '#6B7280',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
