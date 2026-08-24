/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#629fc9',
          board: '#80b8dc',
          conveyor: '#8ebfda',
          conveyorBorder: '#ffffff',
          slotBorder: '#4a7596',
          panel: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}
