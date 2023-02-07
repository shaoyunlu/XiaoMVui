import xmvLayout from 'comps/layout/layout.vue'
import xmvMenu from 'comps/menu/menu.vue'
import xmvMenuCore from 'comps/menu/menuCore.vue'

const register = (vue)=>{
    vue.component('xmvLayout', xmvLayout)
    vue.component('xmvMenu', xmvMenu)
    vue.component('xmvMenuCore', xmvMenuCore)
}

export default register