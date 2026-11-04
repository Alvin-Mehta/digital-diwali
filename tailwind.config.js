/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#0a0418',
          base: '#110726',
          surface: '#1d0f3b',
          elevated: '#2b1853',
        },
        gold: {
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        festive: {
          orange: '#ff6b00',
          red: '#ef4444',
          crimson: '#991b1b',
          pink: '#ec4899',
          teal: '#14b8a6',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        festive: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        festive: '0 0 25px rgba(245, 158, 11, 0.25)',
        glow: '0 0 35px rgba(255, 107, 0, 0.45)',
        diya: '0 0 20px rgba(252, 211, 77, 0.6)',
      },
    },
  },
  plugins: [],
};

