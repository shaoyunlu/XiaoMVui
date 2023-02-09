<template>
    <xmv-layout mode="l_tr" lWval="300px">
        <template v-slot:top>
            <div>top</div>
        </template>
        <template v-slot:left>
            <xmv-menu ref="menuRef"></xmv-menu>
        </template>
        <template v-slot:right>
            <div>
                <xmv-tooltip>
                    <xmv-button @btnClick="handleCollapse">折叠</xmv-button>
                </xmv-tooltip>
                
                <xmv-button @btnClick="handleExpand">展开</xmv-button>
            </div>
        </template>
    </xmv-layout>
</template>

<script>
import {defineComponent,onMounted,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const handleCollapse = ()=>{
            menuRef.value.collapse()
        }

        const handleExpand = ()=>{
            menuRef.value.expand()
        }

        const menuRef = ref(null)

        const menuData = [
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单三' ,childNodes : [
                {name : '菜单三-1'},
                {name : '菜单三-2',childNodes:[
                    {name : '菜单三-2-1'}
                ]}
            ]}
        ]

        onMounted(()=>{
            menuRef.value.loadData(menuData)
        })

        return {
            menuRef,handleCollapse,handleExpand
        }
    }
})
</script>

<style scoped lang="less">

</style>