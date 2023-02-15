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
                
                <xmv-button @btnClick="handleCollapse">折叠</xmv-button>
                <xmv-button @btnClick="handleExpand">展开</xmv-button>
                <h3>Tootip</h3>
                <ul>
                    <li>
                        <xmv-tooltip content="上边" placement="top">
                            <xmv-button>上</xmv-button>
                        </xmv-tooltip>
                    </li>
                    <li>
                        <xmv-tooltip content="下边" placement="bottom">
                            <xmv-button>下</xmv-button>
                        </xmv-tooltip>
                    </li>
                    <li>
                        <xmv-tooltip content="左边" placement="left">
                            <xmv-button>左</xmv-button>
                        </xmv-tooltip>
                    </li>
                    <li>
                        <xmv-tooltip content="右边" placement="right">
                            <xmv-button>右</xmv-button>
                        </xmv-tooltip>
                    </li>
                </ul>
                <h3>Popover</h3>
                <ul>
                    <li>
                        <!--
                        <xmv-popover placement="right">
                            <template #trigger>
                                <xmv-button>右</xmv-button>
                            </template>
                            <xmv-button>右</xmv-button>
                        </xmv-popover>
                        -->
                    </li>
                </ul>
                
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