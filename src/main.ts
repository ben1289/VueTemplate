import { createApp } from 'vue'
import store from './store'
import router from './router'
import i18n from './locale'
import App from './App.vue'
import { setContext } from './hooks/message'
import './plugin/unocss'
import './assets/style/main.less'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
setContext(app._context)
