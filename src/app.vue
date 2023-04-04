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
        
        <div style="width:600px">
            <xmv-table ref="tableRef" :header="tableHeader"></xmv-table>
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
            {name : '菜单一11'},
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
                {name : '菜单二'},
                {name : '菜单一'},
            ]},
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单二'},
            {name : '菜单二' ,childNodes : [
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单二'},
                {name : '菜单一'},
            ]},
            {name : '菜单二' ,childNodes : [
                {name : '菜单一'},
                {name : '菜单二'},
                {name : '菜单一'},
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

        const tableRef = ref(null)
        const tableHeader = [
            {name : '序列一' ,width:100},
            {name : '序列二' ,width:200},
            {name : '序列三' ,width:500}
        ]

        onMounted(()=>{
            horizontalMenuRef.value.loadData(horizontalMenuData)
            sideBarMenuRef.value.loadData(sideBarMenuData)
        })

        return {
            horizontalMenuRef,sideBarMenuRef,tableRef,tableHeader
        }
    }
})
</script>

<style scoped lang="less">
    ul li{
        margin : 30px 0
    }
</style>