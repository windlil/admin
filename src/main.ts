import { createApp } from 'vue'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import { useIconComponents } from './utils/useComponent'
import { getLocalData } from './utils/getLocalData'

const app = createApp(App)

app.use(pinia)

getLocalData()

app.use(router)

useIconComponents(app)

app.mount('#app')
