<template>
    <label class="xmv-radio-button" 
                :class="{
                    'is-disabled':disabled,
                    'xmv-radio-button--small':size == 'small'
                }">
        <input type="radio" class="xmv-radio-button__original-radio" 
            :value="label" :name="name" ref="inputRef">
        <span class="xmv-radio-button__inner">
            <slot></slot>
        </span>
    </label>
</template>

<script>
import {defineComponent ,inject ,onMounted ,ref ,watch} from 'vue'
export default defineComponent({
    name:"xmvRadioButton",
    props:{
        label : String,
        size : String,
        disabled : String
    },
    setup(props ,context) {

        const name = inject('Name')
        const inputRef = ref(null)
        const disabled = ref(props.disabled != undefined)

        watch(disabled ,(newVal ,oldVal)=>{
            if (disabled.value){
                inputRef.value.setAttribute('disabled','disabled')
            }else{
                inputRef.value.removeAttribute('disabled')
            }
        })

        onMounted(()=>{
            if (disabled.value){
                inputRef.value.setAttribute('disabled','disabled')
            }
        })

        return {name,inputRef,disabled}
    }
})
</script>

<style lang="" scoped></style>
