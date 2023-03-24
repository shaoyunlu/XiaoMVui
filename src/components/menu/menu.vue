<template>
    <ul class="xmv-menu"  ref="menuElRef"
        :class="{'xmv-menu--collapse' : menuMode.rctMenu.isCollapse ,
                'xmv-menu--vertical' : isVertical,
                'xmv-menu--horizontal' : !isVertical}"  style="--xmv-menu-level:0">
        <xmv-menu-core v-for="child in menuMode.rctMenu.data" :node="child" 
                    v-if="!menuMode.rctMenu.isCollapse && isVertical "></xmv-menu-core>
        <xmv-menu-core-collapse v-for="child in menuMode.rctMenu.data" :node="child"
                    v-if="menuMode.rctMenu.isCollapse"></xmv-menu-core-collapse>
        <xmv-menu-core-horizontal v-for="child in menuMode.rctMenu.data" :node="child" 
                    v-if="!isVertical"></xmv-menu-core-horizontal>
    </ul>
</template>

<script>
import {defineComponent, onMounted, provide ,ref} from 'vue'
import MenuMode from './mode/menuMode'

export default defineComponent({
    name:"xmvMenu",
    props:{
        isVertical : {
            type : Boolean,
            default : true
        }
    },
    setup(props ,context) {

        const menuElRef = ref(null)
        const menuMode = new MenuMode()
        
        const loadData = (menuData)=>{
            menuMode.loadData(menuData)
        }

        const collapse = ()=>{
            menuMode.collapse()
        }

        const expand = ()=>{
            menuMode.expand()
        }

        onMounted(()=>{
            menuMode.menuElRef = menuElRef
            menuMode.onMounted()
        })

        provide('MenuMode' ,menuMode)
        provide('Level' ,0)
        provide('IsVertical' ,props.isVertical)

        return {
            loadData,menuMode,collapse,expand,menuElRef
        }
    }
})
</script>

<style lang="less">
 
</style>