<template>
    <li class="xmv-sub-menu" @click.stop="handleClick">
        <div class="xmv-sub-menu__title">
            <span>{{node.name}}</span>
        </div>
        <ul class="xmv-menu" v-show="node.childNodesVisible" ref="subXmvMenuRef">
            <xmv-menu-core v-for="child in node.childNodes" :node="child"></xmv-menu-core>
        </ul>
    </li>
</template>

<script>
import {defineComponent, inject, nextTick, onMounted, ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup(props ,context) {

        const menuMode = inject('MenuMode')
        const subXmvMenuRef = ref(null)

        const handleClick = ()=>{
            menuMode.subClick(props.node ,subXmvMenuRef.value)
        }

        return {
            handleClick ,subXmvMenuRef
        }
    }
})
</script>

<style lang="less">
    
</style>