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
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        title: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
