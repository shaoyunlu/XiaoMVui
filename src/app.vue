<template>
    <header class="navbar has-sidebar">  
        <xmv-menu ref="horizontalMenuRef" :isVertical="false"></xmv-menu>
    </header>
    <div class="sidebar">
        <xmv-scrollbar :explicit="true">
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
                    <xmv-table-column prop="height" label="身高" width="800"></xmv-table-column>
                </xmv-table>
            </div>
        </div>
        <div>
            <span><xmv-icon name="plus"></xmv-icon></span>
            <span><xmv-icon name="minus"></xmv-icon></span>
            <span><xmv-icon name="search"></xmv-icon></span>
            <span><xmv-icon name="close"></xmv-icon></span>
            <span><xmv-icon name="arrowRight"></xmv-icon></span>
            <span><xmv-icon name="loading"></xmv-icon></span>
            <span><xmv-icon name="check"></xmv-icon></span>
            <span><xmv-icon name="edit"></xmv-icon></span>
            <span><xmv-icon name="dlt"></xmv-icon></span>
            <span><xmv-icon name="sort"></xmv-icon></span>
            <span><xmv-icon name="setting"></xmv-icon></span>
            <span><xmv-icon name="refresh"></xmv-icon></span>
        </div>
        <xmv-row :gutter="20" justify="center">
            <xmv-col :span="6">
                col
            </xmv-col>
            <xmv-col :span="6">
                col
            </xmv-col>
            <xmv-col :span="6">
                col
            </xmv-col>
        </xmv-row>

        <xmv-button>点击</xmv-button>
        <xmv-button type="primary">primary</xmv-button>
        <xmv-button plain>点击</xmv-button>
        <xmv-button type="primary" plain>点击</xmv-button>
        <xmv-button round>点击</xmv-button>
        <xmv-button type="primary" round>点击</xmv-button>
        <xmv-button circle icon="search"></xmv-button>
        <xmv-button circle icon="dlt"></xmv-button>
        <xmv-button circle icon="edit"></xmv-button>
        <xmv-button circle icon="plus"></xmv-button>
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
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单三' ,childNodes : [
                {name : '菜单三-一' ,active : true},
                {name : '菜单三-二',childNodes:[
                    {name : '菜单三-二-一'}
                ]}
            ]}
        ]

        const sideBarMenuData = [
            {name : '菜单1'},
            {name : '菜单2' ,childNodes : [
                {name : '菜单2-1'},
                {name : '菜单2-2'},
                {name : '菜单2-3'},
                {name : '菜单2-4'},
            ]},
            {name : '菜单3'},
            {name : '菜单4'},
            {name : '菜单5'},
            {name : '菜单6' ,childNodes : [
                {name : '菜单6-1'},
                {name : '菜单6-2'},
                {name : '菜单6-3'},
                {name : '菜单6-4'},
            ]},
            {name : '菜单7' ,childNodes : [
                {name : '菜单7-1'},
                {name : '菜单7-2'},
                {name : '菜单7-3'},
                {name : '菜单7-4'},
                {name : '菜单7-6'},
                {name : '菜单7-7'},
            ]},
            {name : '菜单8' ,childNodes : [
                {name : '菜单8-1' ,active : true},
                {name : '菜单8-2',childNodes:[
                    {name : '菜单8-2-1'}
                ]}
            ]}
        ]

        const tableRef = ref(null)

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
            horizontalMenuRef,sideBarMenuRef,tableRef
        }
    }
})
</script>

<style scoped lang="less">
    ul li{
        margin : 30px 0
    }
</style>