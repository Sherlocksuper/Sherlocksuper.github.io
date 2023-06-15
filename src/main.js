import {createApp} from 'vue'
import App from './App.vue'

import router from './index.js'
import store from './store.js'

import ElementPlus from 'element-plus'
import  'element-plus/dist/index.css'

const app = createApp(App);

app.use(router).use(store).use(ElementPlus).mount('#app');