/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0a4fa8', dark: '#073a7d', mid: '#1864c0', light: '#3b86d8', soft: '#e6f0fa' },
        accent: { DEFAULT: '#ff6a00', dark: '#e25c00', light: '#ffb066' },
        ink: {
          '950': '#0b0b0b',
          '900': '#1a1d23',
          '800': '#2d3138',
          '700': '#454a52',
          '600': '#5e636c',
          '500': '#7a808a',
          '400': '#a3a8b1',
          '300': '#d0d4da',
          '200': '#e4e7ec',
          '100': '#eef1f4',
          '050': '#f6f8fa',
          '025': '#fafbfc',
        },
      },
      fontFamily: {
        display: ['"Inter"', '"Roboto"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', '"Roboto"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '600' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 0.9s ease both',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 6px 16px rgba(15, 23, 42, 0.10), 0 2px 4px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
