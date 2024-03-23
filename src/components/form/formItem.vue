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
import {defineComponent, inject, watch ,computed ,ref, getCurrentInstance, nextTick, onMounted} from 'vue'
import {validate} from './mode/validate'
import {isEmpty ,areArraysEqualDeep} from 'utils/data'
export default defineComponent({
    name:"xmvFormItem",
    props:{
        label : {type:String ,default:''},
        prop : String,
        required : Boolean,
        rules : Array
    },
    setup({label ,prop ,required ,rules:__rules} ,context) {

        const formProps = inject('Props')
        const formItemCollector = inject('Collector')
        const {$on ,$emit} = inject('EventBus' ,{$on:()=>{} ,$emit:()=>{}})

        const mode = formProps.mode
        const rules = formProps.rules || {}

        const isError = ref(false)
        const errorInfo = ref('')
        const isRequired = ref(false)

        let isFormReset = false
        let oriValue

        formItemCollector.push(getCurrentInstance())

        const computeLabelStyle = computed(()=>{
            if (formProps.labelWidth != undefined){
                return {'width' : formProps.labelWidth}
            }
        })

        $on('errorReset',()=>{
            isError.value = false
        })

        $on('formReset' ,()=>{
            isFormReset = true
            isError.value = false
            setNestedValue(mode ,prop ,oriValue)
            nextTick(()=>{
                isFormReset = false
            })
            
        })

        const propWatch = computed(()=>{
            let value = prop.split('.').reduce((o, k) => o[k], mode);
            return value
        })

        if (prop != undefined){
            watch(propWatch,(newVal,oldVal)=>{
                if (isFormReset){
                    return false
                }
                // 这里需要对数组进行单独判断，因为数组重新赋值之后一定是个新值
                if (Array.isArray(newVal) && areArraysEqualDeep(newVal ,oldVal)){
                    return false
                }
                validateByRules(newVal).then(()=>{}).catch(()=>{})
            })
        }

        const validateByRules = ()=>{
            return new Promise((resolve ,reject)=>{
                if (prop == undefined){
                    resolve()
                    return false
                }
                let newVal = prop.split('.').reduce((o, k) => o[k], mode);
                let val = mode[prop]
                let ruleList = rules[prop] || __rules
                let info = validate(newVal ,ruleList)
                if (info){
                    isError.value = true
                    errorInfo.value = info
                }else{
                    isError.value = false
                    errorInfo.value = ''
                }
                if (!isError.value){
                    let validator = findValidator()
                    if (validator){
                        validator(newVal).then(()=>{
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

        const findValidator = ()=>{
            let validator = null
            let ruleList = rules[prop]
            if (isEmpty(ruleList)){
                return null
            }
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
            let ruleList = rules[prop] || __rules
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

        function setNestedValue(obj, path, value) {
            // 将路径字符串分解成数组
            const keys = path.split('.');
            // 获取最后一个键
            const lastKey = keys.pop();
            // 遍历路径中的每个键，除了最后一个
            const lastObj = keys.reduce((acc, key) => {
                // 确保键对应的值是一个对象
                if (!acc[key]) acc[key] = {};
                return acc[key];
            }, obj);
            // 给最后一个键赋值
            lastObj[lastKey] = value;
        }

        onMounted(()=>{
            oriValue = prop.split('.').reduce((o, k) => o[k], mode);
        })

        return {isError,errorInfo,isRequired,computeLabelStyle,computeRequired,validateByRules}
    }
})
</script>

<style lang="" scoped></style>
