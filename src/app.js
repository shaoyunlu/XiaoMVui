/**
 * 程序入口
 */

import { createApp } from "vue";
import App from './app.vue'
import register from '../xmv-ui'

const app = createApp(App)
app.use(register)
app.mount("#app")