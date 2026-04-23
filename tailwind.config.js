/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1a1a1a', dark: '#000000', light: '#333333', accent: '#c6002a' },
        ink: {
          '950': '#0b0b0b',
          '900': '#141414',
          '800': '#2a2a2a',
          '700': '#3e3e3e',
          '600': '#5a5a5a',
          '500': '#7a7a7a',
          '400': '#9a9a9a',
          '300': '#c9c9c9',
          '200': '#e2e2e2',
          '100': '#eeeeee',
          '050': '#f5f5f5',
          '025': '#fafafa',
        },
      },
      fontFamily: {
        display: ['"Polestar Unica77"', '"Inter"', '"Helvetica Neue"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Inter"', '"Helvetica Neue"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '500' }],
        'display-lg': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1.06', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-sm': ['clamp(1.35rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.2s ease both',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
};
