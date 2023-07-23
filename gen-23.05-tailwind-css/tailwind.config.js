/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'anonymous-pro': ['"Anonymous Pro"', 'monospace'],
        'fira-mono': ['"Fira Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}