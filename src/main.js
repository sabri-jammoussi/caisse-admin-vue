import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './components/App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import "vue3-dropdown-navbar/preflight.css";
import router from './router';
loadFonts()
const app = createApp(App)
const pinia = createPinia()
app
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mount('#app')
