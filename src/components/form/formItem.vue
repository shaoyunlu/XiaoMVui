<template>
    <div class="xmv-form-item" :class="{'is-error':isError ,'is-required':computeRequired}">
        <label class="xmv-form-item__label" :style="computeLabelStyle" v-if="label != ''">
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
import {defineComponent, inject, watch ,computed ,ref, getCurrentInstance} from 'vue'
import {validate} from './mode/validate'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvFormItem",
    props:{
        label : {type:String ,default:''},
        prop : String,
        required : Boolean
    },
    setup({label ,prop ,required} ,context) {

        const formProps = inject('Props')
        const formItemCollector = inject('Collector')

        const mode = formProps.mode
        const rules = formProps.rules

        const isError = ref(false)
        const errorInfo = ref('')
        const isRequired = ref(false)

        formItemCollector.push(getCurrentInstance())

        const computeLabelStyle = computed(()=>{
            if (formProps.labelWidth != undefined){
                return {'width' : formProps.labelWidth}
            }
        })

        const propWatch = computed(()=>{
            return mode[prop]
        })

        if (prop != undefined){
            watch(propWatch,(newVal)=>{
                validateByRules().then(()=>{}).catch(()=>{})
            })
        }

        const validateByRules = ()=>{
            return new Promise((resolve ,reject)=>{
                if (prop == undefined){
                    resolve()
                    return false
                }
                let val = mode[prop]
                let ruleList = rules[prop]
                let info = validate(val ,ruleList)
                if (info){
                    isError.value = true
                    errorInfo.value = info
                }else{
                    isError.value = false
                    errorInfo.value = ''
                }
                if (!isError.value){
                    //resolve()
                    let validator = findValidator()
                    if (validator){
                        validator().then(()=>{
                            isError.value = false
                            errorInfo.value = ''
                            resolve()
                        }).catch((msg)=>{
                            isError.value = true
                            errorInfo.value = msg
                            reject()
                        })
                    }else{
                        resolve()
                    }
                }
                else{
                    reject(prop + ':' + info)
                }
            })
        }

        const validateByRules_ = ()=>{
            if (prop == undefined){
                return false
            }
            let val = mode[prop]
            let ruleList = rules[prop]
            let info = validate(val ,ruleList)
            if (info){
                isError.value = true
                errorInfo.value = info
            }else{
                isError.value = false
                errorInfo.value = ''
            }
            return isError.value
        }

        const findValidator = ()=>{
            let validator = null
            let ruleList = rules[prop]
            ruleList.forEach(rule =>{
                let keys = Object.keys(rule)
                keys.forEach(key=>{
                    if (key == 'validator'){
                        validator = rule[key]
                    }
                })
            })
            return validator
        }

        const computeRequired = computed(()=>{
            if (required){
                return true
            }
            if (prop == undefined){
                return false
            }
            let ruleList = rules[prop]
            if (!ruleList){
                return false
            }
            let flag = false
            ruleList.forEach(rule =>{
                let keys = Object.keys(rule)
                keys.forEach(key=>{
                    if (key == 'required'){
                        flag = true
                    }
                })
            })
            return flag
        })

        return {isError,errorInfo,isRequired,computeLabelStyle,computeRequired,validateByRules}
    }
})
</script>

<style lang="" scoped></style>
