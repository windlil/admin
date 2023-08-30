import { createApp } from 'vue'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { useIconComponents } from './utils/useComponent'

const app = createApp(App)

app.use(router).use(pinia)

useIconComponents(app)

app.mount('#app')
