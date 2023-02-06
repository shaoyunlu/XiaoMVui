import xmvLayout from 'comps/layout/layout.vue'
import xmvMenu from 'comps/menu/menu.vue'

const register = (vue)=>{
    vue.component('xmvLayout', xmvLayout)
    vue.component('xmvMenu', xmvMenu)
}

export default register