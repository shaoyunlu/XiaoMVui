<template>
    <li class="xmv-sub-menu" @click.stop="handleClick">
        <div class="xmv-sub-menu__title">
            <i class="xmv-icon-code" v-if="level == 1"></i>
            <span>{{node.name}}</span>
        </div>

        <ul class="xmv-menu" v-show="node.childNodesVisible" ref="subXmvMenuRef" 
            :style="{'--xmv-menu-level':level}">
            <xmv-menu-core v-for="child in node.childNodes" :node="child"></xmv-menu-core>
        </ul>
    </li>
</template>

<script>
import {defineComponent, inject, onMounted, ref ,watch} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup(props ,context) {
        const level = inject('Level')
        const menuMode = inject('MenuMode')
        const subXmvMenuRef = ref(null)

        const handleClick = ()=>{
            menuMode.subClick(props.node ,subXmvMenuRef.value)
        }

        onMounted(()=>{
            props.node.subXmvMenuRef = subXmvMenuRef
        })

        return {
            handleClick ,subXmvMenuRef,level,menuMode
        }
    }
})
</script>

<style lang="less">
    
</style>