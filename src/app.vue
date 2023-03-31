<template>
    <header class="navbar has-sidebar">
        
        <xmv-menu ref="horizontalMenuRef" :isVertical="false"></xmv-menu>
        
    </header>
    <div class="sidebar">
        
        <xmv-scrollbar>
            <xmv-menu ref="sideBarMenuRef"></xmv-menu>
        </xmv-scrollbar>
        
    </div>
    <main id="page-content" class="page-content has-sidebar">
        
        <div style="width:200px;height: 300px;background-color: greenyellow;">
            <xmv-scrollbar>
                <div style="width:500px">
                    <p>123a</p>
                </div>
            </xmv-scrollbar>
        </div>
        
    </main>
</template>

<script>
import {defineComponent,onMounted,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const horizontalMenuRef = ref(null)
        const sideBarMenuRef = ref(null)

        // const handleCollapse = ()=>{
        //     menuRef.value.collapse()
        // }

        // const handleExpand = ()=>{
        //     menuRef.value.expand()
        // }

        const horizontalMenuData = [
            {name : '菜单一1'},
            {name : '菜单二'},
            {name : '菜单三' ,childNodes : [
                {name : '菜单三-1' ,active : true},
                {name : '菜单三-2',childNodes:[
                    {name : '菜单三-2-1'}
                ]}
            ]}
        ]

        const sideBarMenuData = [
            {name : '菜单一'},
            {name : '菜单二' ,childNodes : [
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
            ]},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单二' ,childNodes : [
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
            ]},
            {name : '菜单二' ,childNodes : [
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
            ]},
            {name : '菜单三' ,childNodes : [
                {name : '菜单三-1' ,active : true},
                {name : '菜单三-2',childNodes:[
                    {name : '菜单三-2-1'}
                ]}
            ]}
        ]

        onMounted(()=>{
            horizontalMenuRef.value.loadData(horizontalMenuData)
            sideBarMenuRef.value.loadData(sideBarMenuData)
        })

        return {
            horizontalMenuRef,sideBarMenuRef
        }
    }
})
</script>

<style scoped lang="less">
    ul li{
        margin : 30px 0
    }
</style>