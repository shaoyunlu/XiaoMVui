<template>
    <div class="xmv-checkbox" :class="{'is-checked':isChecked ,'is-disabled':disabled}" @click.stop="handleClick">
        <span class="xmv-checkbox__input" 
            :class="{'is-checked':isChecked ,'is-disabled':disabled ,'is-indeterminate':isIndeterminate}">
            <input type="checkbox" class="xmv-checkbox__original" :value="label" ref="inputRef">
            <span class="xmv-checkbox__inner"></span>
        </span>
        <span class="xmv-checkbox__label" v-if="computeLabelShow">
            <slot></slot>
        </span>
    </div>
</template>

<script>
import {defineComponent ,ref ,computed, watch} from 'vue'
export default defineComponent({
    name:"xmvCheckbox",
    emits:['check'],
    props:{
        disabled:String,
        label:String,
        checkStatus:Boolean,
        indeterminateStatus:Boolean
    },
    setup(props ,context) {
        const inputRef = ref(null)
        const isChecked = ref(false)
        const isIndeterminate = ref(false)
        const disabled = ref(props.disabled != undefined)

        const handleClick = ()=>{
            if (disabled.value){
                return false
            }
            isChecked.value = !isChecked.value
            context.emit('check' , isChecked.value)
        }

        const computeLabelShow = computed(()=>{
            return props.label != undefined
        })

        watch(isChecked ,(newVal)=>{
            if (isChecked.value)
                inputRef.value.setAttribute('checked','')
            else
                inputRef.value.removeAttribute('checked')
        })

        watch(()=>props.checkStatus ,val =>{
            isChecked.value = val
        })

        watch(()=>props.indeterminateStatus ,val =>{
            isIndeterminate.value = val
        })

        return {isChecked,isIndeterminate,disabled,inputRef,handleClick,computeLabelShow}
    }
})
</script>

<style lang="" scoped></style>
