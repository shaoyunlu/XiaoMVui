<template>
    <form class="xmv-form xmv-form--default" :class="computeFormClass">
        <slot></slot>
    </form>
</template>

<script>
import {defineComponent, provide ,computed} from 'vue'
export default defineComponent({
    name:"xmvForm",
    props:{
        mode : Object,
        rules : Object,
        labelWidth : String,
        labelPosition : {type:String ,default:'right'}
    },
    setup(props ,context) {

        provide('Props' ,props)

        const computeFormClass = computed(()=>{
            let res = []
            res.push('xmv-form--label-' + props.labelPosition)
            return res 
        })

        return {computeFormClass}
    }
})
</script>

<style lang="" scoped></style>
