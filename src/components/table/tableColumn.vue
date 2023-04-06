<template>
    
</template>

<script>
import {defineComponent, getCurrentInstance, inject, onMounted} from 'vue'
export default defineComponent({
    name:"xmvTableColumn",
    props:{
        prop : String,
        label : String,
        width : String
    },
    setup(props ,context) {
        const tableMode = inject('TableMode')
        const instance = getCurrentInstance()

        tableMode.rctData.header.push({
            label : props.label,
            prop : props.prop,
            width : props.width,
            slots : instance.slots
        })

    }
})
</script>

<style scoped lang="less">

</style>