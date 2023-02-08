<template>
    <li class="xmv-menu-item" :class="{'is-active':node.active}" @click.stop="handleClick">
        <i class="xmv-icon-code"></i>
        <span>{{node.name}}</span>
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
            handleClick
        }
    }
})
</script>

<style lang="less">
    
</style>