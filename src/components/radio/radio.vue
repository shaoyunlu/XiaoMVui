<template>
    <label class="xmv-radio" @click="handleClick"
        :class="{
                    'xmv-radio--large':size == 'large',
                    'is-checked':isChecked,
                    'is-disabled':disabled
                }">
        <span class="xmv-radio__input" :class="{'is-checked':isChecked,'is-disabled':disabled}" >
            <input type="radio" class="xmv-radio__original" :value="label" :name="groupProps.model" ref="inputRef">
            <span class="xmv-radio__inner"></span>
        </span>
        <span class="xmv-radio__label">
            <slot></slot>
        </span>
    </label>
</template>

<script>
import {ref, defineComponent, inject, watch, onMounted} from 'vue'
export default defineComponent({
    name:"xmvRadio",
    props:{
        label : String,
        size : String,
        disabled : String
    },
    setup(props ,context) {
        const {$on ,$emit} = inject('EventBus')
        const groupProps = inject('GroupProps')
        const isChecked = ref(false)
        const disabled = ref(props.disabled != undefined)
        const inputRef = ref(null)

        const handleClick = (e)=>{
            if (disabled.value){
                return false
            }
            if (!isChecked.value){
                isChecked.value = true
                $emit('radioClick' ,props.label)
            }
        }

        $on('radioClick' ,(label)=>{
            if (props.label != label){
                isChecked.value = false
            }
        })

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

        return {groupProps,isChecked,disabled,inputRef,handleClick}
    }
})
</script>

<style lang="" scoped></style>
