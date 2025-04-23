/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        herbgreen: '#166534', // main green (deep forest)
        herbgreenLight: '#22c55e', // light green (vibrant highlight)
        herbwhite: '#fefdfc', // background white
        herbgray: '#6b7280', // neutral text
        primary: '#166534', // override your existing primary to match brand
        secondary: '#22c55e',
        background: '#fefdfc',
        border: '#d1d5db',
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        vote: 'vote 1s ease-in-out',
      },
      keyframes: {
        vote: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-30deg)' },
          '75%': { transform: 'rotate(30deg)' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
