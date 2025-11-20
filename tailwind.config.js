import type { Config } from 'tailwindcss'

const config: Config = {
   prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  plugins: [
     require('@tailwindcss/forms'),
  ],

  theme: {
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        '"Noto Sans"',
        '"Liberation Sans"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ]
    }
  }
}

export default config
