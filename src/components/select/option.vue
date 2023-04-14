<template>
</template>

<script>
import {defineComponent, inject} from 'vue'
export default defineComponent({
    name:"xmvOption",
    props:{
        label : String,
        value : String
    },
    setup(props ,context) {

        const selectMode = inject('SelectMode')

        selectMode.rctData.options.push(props)

        return {}
    }
})
</script>

<style lang="" scoped></style>
