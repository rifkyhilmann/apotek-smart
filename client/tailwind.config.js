/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playwrite: ['Playwrite SK', 'sans-serif'],
        pridi: ['Pridi', 'sans-serif'],
      },
      colors : {
        primary : '#0255a3',
        customGray: 'rgb(150,150,150)',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to left , #80C9FF , #4E9BFC)',
        'red-gradient': 'linear-gradient(to right, #9D2108, #7A1D06)',
      },
    },
  },
  plugins: [],
}
