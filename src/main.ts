import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Money3Directive } from 'v-money3'

const app = createApp(App)
app.directive('money3', Money3Directive)

app.use(createPinia())
app.use(router)

app.mount('#app')
