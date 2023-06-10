import {createApp} from 'vue'
import App from './App.vue'

//导入路由并挂在到App
import router from './index.js'
//挂载到app
createApp(App).use(router).mount('#app')

