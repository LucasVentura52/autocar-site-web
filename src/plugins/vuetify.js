import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const autocarTheme = {
  dark: true,
  colors: {
    background: '#0f1217',
    surface: '#171b22',
    primary: '#ff7a1a',
    secondary: '#232935',
    success: '#2f9f5a',
    info: '#4a90e2',
    warning: '#ff9b33',
    error: '#f25555',
  },
}

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'autocarTheme',
    themes: {
      autocarTheme,
    },
  },
  defaults: {
    VBtn: {
      rounded: 'pill',
    },
  },
})
