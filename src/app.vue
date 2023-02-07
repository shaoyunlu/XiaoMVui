<template>
    <xmv-layout mode="l_tr" lWval="300px">
        <template v-slot:top>
            <div>top</div>
        </template>
        <template v-slot:left>
            <xmv-menu ref="menuRef"></xmv-menu>
        </template>
        <template v-slot:right>
            <div>right</div>
        </template>
    </xmv-layout>
</template>

<script>
import {defineComponent,onMounted,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const menuRef = ref(null)

        const menuData = [
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单三' ,childNodes : [
                {name : '菜单三-1'},
                {name : '菜单三-2'}
            ]}
        ]

        onMounted(()=>{
            menuRef.value.loadData(menuData)
        })

        return {
            menuRef
        }
    }
})
</script>

<style scoped lang="less">

</style>