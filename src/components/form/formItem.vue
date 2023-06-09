<template>
    <div class="xmv-form-item" :class="{'is-error':isError ,'is-required':isRequired}">
        <label class="xmv-form-item__label" :style="computeLabelStyle">
            {{label}}
        </label>
        <div class="xmv-form-item__content">
            <slot></slot>
            <transition name="form">
                <div class="xmv-form-item__error" v-if="isError">{{errorInfo}}</div>
            </transition>
        </div>
    </div>
</template>

<script>
import {defineComponent, inject, watch ,computed ,ref} from 'vue'
import {validate} from './mode/validate'
export default defineComponent({
    name:"xmvFormItem",
    props:{
        label : {type:String ,default:''},
        prop : String
    },
    setup({label ,prop} ,context) {

        const formProps = inject('Props')

        const mode = formProps.mode
        const rules = formProps.rules

        const isError = ref(false)
        const errorInfo = ref('')
        const isRequired = ref(false)

        const computeLabelStyle = computed(()=>{
            if (formProps.labelWidth != undefined){
                return {'width' : formProps.labelWidth}
            }
        })

        const handleBlur = ()=>{
            console.log('blur')
        }

        const propWatch = computed(()=>{
            return mode[prop]
        })

        if (prop != undefined){
            watch(propWatch,(newVal)=>{
                validateByRules(newVal)
            })
        }

        const validateByRules = (val)=>{
            let ruleList = rules[prop]
            let info = validate(val ,ruleList)
            if (info){
                isError.value = true
                errorInfo.value = info
            }else{
                isError.value = false
                errorInfo.value = ''
            }
        }

        return {isError,errorInfo,isRequired,handleBlur,computeLabelStyle}
    }
})
</script>

<style lang="" scoped></style>
