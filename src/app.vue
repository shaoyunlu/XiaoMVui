<template>
    <xmv-layout mode="l_tr">
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

        onMounted(()=>{
            menuRef.value.loadData()
        })

        return {
            menuRef
        }
    }
})
</script>

<style scoped lang="less">

</style>