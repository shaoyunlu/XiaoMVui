<template>
    <div class="xmv-switch" :class="computeClass" @click="handleClick">
        <input class="xmv-switch__input" type="checkbox">
        <span class="xmv-switch__core">
            <div class="xmv-switch__inner" v-if="inlinePrompt != undefined">
                <span class="is-text">{{innerText}}</span>
            </div>
            <div class="xmv-switch__action"></div>
        </span>
    </div>
</template>

<script>
import {defineComponent, onMounted, watch ,ref, computed} from 'vue'
export default defineComponent({
    name:"xmvSwitch",
    props:{
        size : String,
        inlinePrompt : String,
        activeText:{type:String ,default : '是'},
        inactiveText:{type:String ,default : '否'},
        modelValue : Boolean
    },
    setup(props ,context) {

        const isActive = ref(false)
        const innerText = ref('')

        const computeClass = computed(()=>{
            let res = []
            if (isActive.value){
                res.push('is-checked')
            }
            if (props.size != undefined){
                res.push('xmv-switch--' + props.size)
            }
            return res
        })

        const handleClick = ()=>{
            isActive.value = !isActive.value
            context.emit('update:modelValue' ,isActive.value)
        }

        watch(()=>props.modelValue ,(newVal)=>{
            handleWach(newVal)
        })

        const handleWach = (val)=>{
            isActive.value = val
            if (props.inlinePrompt != undefined){
                innerText.value = (isActive.value ? props.activeText : props.inactiveText)
            }
        }

        onMounted(()=>{
            if (props.modelValue != undefined){
                handleWach(props.modelValue)
            }
        })

        return {isActive ,innerText ,computeClass ,handleClick}
    }
})
</script>

<style lang="" scoped></style>
