import { createApp } from 'vue'
import { vuetify } from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './style.css'
import App from './App.vue'

createApp(App).use(vuetify).mount('#app')
