/**
 * 程序入口
 */

import { createApp } from "vue";
import App from './app.vue'
import register from '../xmv-ui'
import 'style/app.less'

import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fas, far, fab)

const app = createApp(App)
app.use(register)
app.mount("#app")