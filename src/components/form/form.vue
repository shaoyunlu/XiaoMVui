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
        labelPosition : {type:String ,default:'right'},
        inline:{type:Boolean,default:false}
    },
    setup(props ,context) {

        provide('Props' ,props)

        const computeFormClass = computed(()=>{
            let res = []
            res.push('xmv-form--label-' + props.labelPosition)
            if (props.inline){
                res.push('xmv-form--inline')
            }
            return res 
        })

        return {computeFormClass}
    }
})
</script>

<style lang="" scoped></style>
