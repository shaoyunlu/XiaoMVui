<template>
    <ul class="xmv-menu">menu</ul>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name:"xmvMenu",
    setup(props ,context) {

        const loadData = ()=>{
            console.log('loadData')
        }

        return {
            loadData
        }
    }
})
</script>

<style scoped lang="less">

</style>