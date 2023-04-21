<template>
    <div class="xmv-checkbox" :class="{'is-checked':isChecked ,'is-disabled':disabled}" @click.stop="handleClick">
        <span class="xmv-checkbox__input" :class="{'is-checked':isChecked ,'is-disabled':disabled}">
            <input type="checkbox" class="xmv-checkbox__original" :value="label" ref="inputRef">
            <span class="xmv-checkbox__inner"></span>
        </span>
        <span class="xmv-checkbox__label">
            <slot></slot>
        </span>
    </div>
</template>

<script>
import {defineComponent ,ref} from 'vue'
export default defineComponent({
    name:"xmvCheckbox",
    props:{
        disabled:String,
        label:String
    },
    setup(props ,context) {
        const inputRef = ref(null)
        const isChecked = ref(false)
        const disabled = ref(props.disabled != undefined)

        const handleClick = ()=>{
            if (disabled.value){
                return false
            }
            isChecked.value = !isChecked.value
            if (isChecked.value)
                inputRef.value.setAttribute('checked','')
            else
                inputRef.value.removeAttribute('checked')
        }
        return {isChecked ,disabled ,inputRef ,handleClick}
    }
})
</script>

<style lang="" scoped></style>
