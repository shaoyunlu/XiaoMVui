<template>
    <form class="xmv-form xmv-form--default xmv-form--label-right">
        <slot></slot>
    </form>
</template>

<script>
import {defineComponent, onMounted, provide} from 'vue'
export default defineComponent({
    name:"xmvForm",
    props:{
        mode : Object,
        rules : Object
    },
    setup(props ,context) {
        provide('Mode' ,props.mode)
        provide('Rules' ,props.rules)

        onMounted(()=>{
            console.log(context)
        })

        return {}
    }
})
</script>

<style lang="" scoped></style>
