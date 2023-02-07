<template>
    <li class="xmv-menu-item" @click.stop="handleClick">
        <span>{{node.name}}</span>
    </li>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup(props ,context) {

        const handleClick = ()=>{
            
        }

        return {

        }
    }
})
</script>

<style lang="less">
    
</style>