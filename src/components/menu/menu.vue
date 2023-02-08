<template>
    <ul class="xmv-menu xml-menu--vertical"  
        :class="{'xmv-menu--collapse' : menuMode.rctMenu.isCollapse}"  style="--xmv-menu-level:0">
        <xmv-menu-core v-for="child in menuMode.rctMenu.data" :node="child"></xmv-menu-core>
    </ul>
</template>

<script>
import {defineComponent, provide} from 'vue'
import MenuMode from './mode/menuMode'


export default defineComponent({
    name:"xmvMenu",
    setup(props ,context) {

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

        provide('MenuMode' ,menuMode)
        provide('Level' ,0)

        return {
            loadData,menuMode,collapse,expand
        }
    }
})
</script>

<style lang="less">
 
</style>