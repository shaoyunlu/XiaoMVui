<template>
    <ul class="xmv-menu xml-menu--vertical"  ref="menuElRef"
        :class="{'xmv-menu--collapse' : menuMode.rctMenu.isCollapse}"  style="--xmv-menu-level:0">
        <xmv-menu-core v-for="child in menuMode.rctMenu.data" :node="child" 
                    v-if="!menuMode.rctMenu.isCollapse"></xmv-menu-core>
        <xmv-menu-core-collapse v-for="child in menuMode.rctMenu.data" :node="child"
                    v-else></xmv-menu-core-collapse>
    </ul>
</template>

<script>
import {defineComponent, onMounted, provide ,ref} from 'vue'
import MenuMode from './mode/menuMode'

export default defineComponent({
    name:"xmvMenu",
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
        })

        provide('MenuMode' ,menuMode)
        provide('Level' ,0)

        return {
            loadData,menuMode,collapse,expand,menuElRef
        }
    }
})
</script>

<style lang="less">
 
</style>