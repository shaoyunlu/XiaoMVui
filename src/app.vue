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
        <div style="display: flex;">
            <div style="flex:1;overflow: hidden;">
                <xmv-table ref="tableRef" height="300">
                    <xmv-table-column prop="name" label="姓名" width="400">
                        <template>
                            <xmv-button>点击1</xmv-button>
                            <xmv-button>点击2</xmv-button>
                        </template>
                    </xmv-table-column>
                    <xmv-table-column prop="age" label="年龄" width="200"></xmv-table-column>
                    <xmv-table-column prop="height" label="身高" width="200"></xmv-table-column>
                </xmv-table>
            </div>
            <div style="flex:1"></div>
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
            {name : '姓名' ,width:100 ,key : 'name'},
            {name : '年龄' ,width:200 ,key : 'age'},
            {name : '身高' ,width:300 ,key : 'height'}
        ]

        const tableData = [
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '李四' ,age : '21' ,height : '181'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '李四' ,age : '21' ,height : '181'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '李四' ,age : '21' ,height : '181'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '李四' ,age : '21' ,height : '181'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '李四' ,age : '21' ,height : '181'}
        ]

        onMounted(()=>{
            horizontalMenuRef.value.loadData(horizontalMenuData)
            sideBarMenuRef.value.loadData(sideBarMenuData)
            tableRef.value.loadData(tableData)
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