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
}

export default config
