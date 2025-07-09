import { space } from 'postcss/lib/list';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'register': "url('/assets/login-register.svg')",
        'home': "url('/assets/bg-home.svg')",
      },
      colors: {
        'primary': '#593187',
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

