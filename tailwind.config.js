/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2E1F3D',
          light: '#422C57',
          dark: '#1D1327',
        },
        parchment: {
          DEFAULT: '#F6EBD3',
          light: '#FDF7EB',
          dark: '#EAD9B8',
          shadow: '#DFCAB0',
        },
        marigold: {
          DEFAULT: '#F2A93B',
          light: '#F6BE66',
          dark: '#D98E1F',
        },
        berry: {
          DEFAULT: '#C4436B',
          light: '#D96587',
          dark: '#A62B51',
        },
        meadow: {
          DEFAULT: '#4C8B5B',
          light: '#6BA578',
          dark: '#386944',
        },
        charcoal: {
          DEFAULT: '#3A342E',
          light: '#5A534B',
          dark: '#241F1A',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        reading: ['Literata', 'Lora', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book-spread': '0 20px 40px -15px rgba(46, 31, 61, 0.25), 0 0 20px rgba(46, 31, 61, 0.08)',
        'book-spine': '2px 0 8px rgba(0, 0, 0, 0.25), inset 3px 0 6px rgba(255, 255, 255, 0.3)',
        'gutter': 'inset 25px 0 35px -10px rgba(46, 31, 61, 0.15)',
        'parchment-card': '0 8px 24px rgba(46, 31, 61, 0.08)',
      },
    },
  },
  plugins: [],
}
