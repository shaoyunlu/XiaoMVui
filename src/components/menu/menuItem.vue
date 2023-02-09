<template>
    <li class="xmv-menu-item" :class="{'is-active':node.active}" @click.stop="handleClick">
        <i class="xmv-icon-code" v-if="!menuMode.rctMenu.isCollapse"></i>
        <span v-if="!menuMode.rctMenu.isCollapse">{{node.name}}</span>
        <div v-if="menuMode.rctMenu.isCollapse" class="xmv-menu-tooltip__trigger xmv-tooltip__trigger">
            <i class="xmv-icon-code"></i>
        </div>
    </li>
</template>

<script>
import {defineComponent,inject} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup(props ,context) {

        const menuMode = inject('MenuMode')

        const handleClick = ()=>{
            menuMode.itemClick(props.node)
        }

        return {
            handleClick,menuMode
        }
    }
})
</script>

<style lang="less">
    
</style>