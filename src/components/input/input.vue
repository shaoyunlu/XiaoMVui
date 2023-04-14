<template>
    <div class="xmv-input" :class="computeClass">
        <div class="xmv-input__wrapper" :class="{'is-focus' : isFocus}">
            <input class="xmv-input__inner" 
                :type="inputType" 
                autocomplete="off"
                ref="inputRef"
                :placeholder="placeholder"
                @focus="handleInputFocus" @blur="handleInputBlur"
                @input="handleInputInput">
            <span class="xmv-input__suffix" v-if="isShowSuffix" ref="suffixRef" @click="handleSuffixClick">
                <span class="xmv-input__suffix-inner">
                    <xmv-icon :name="pwdIconName" class="xmv-input__icon" v-if="pwdShow"
                    @click="handleIconPwdClick"></xmv-icon>
                    <xmv-icon name="circleClose" class="xmv-input__icon" v-if="clearShow"
                    @click="handleIconClearClick"></xmv-icon>
                    <xmv-icon :name="suffixicon"  class="xmv-input__icon" v-if="suffixicon != undefined"></xmv-icon>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import {defineComponent ,ref ,computed} from 'vue'
export default defineComponent({
    name:"xmvInput",
    props:{
        disabled : String,
        type : {type:String ,default:'text'},
        placeholder : {type:String ,default:'请输入'},
        showpassword : String,
        suffixicon : String,
        clearable : String,
        size : String
    },
    setup(props ,context) {

        const isFocus = ref(false)
        const inputRef = ref(null)
        const isShowSuffix = ref(false)
        const iconName = ref('')
        const pwdIconName = ref('hide')
        const suffixRef = ref(null)
        const inputType = ref(props.type)
        const pwdShow = ref(false)
        const clearShow = ref(false)

        const computeClass = computed(()=>{
            let res = []
            if (props.disabled != undefined){
                res.push('is-disabled')
            }
            if (props.size != undefined){
                res.push('xmv-input--' + props.size)
            }
            return res
        })

        const handleInputFocus = ()=>{
            isFocus.value = true
        }

        const handleInputBlur = ()=>{
            isFocus.value = false
        }

        const handleInputInput = ()=>{
            if (props.clearable != undefined || props.showpassword != undefined){
                // 判断输入框里是否有值
                if (inputRef.value.value){
                    if (props.showpassword != undefined){
                        isShowSuffix.value = true
                        pwdShow.value = true
                    }
                    if (props.clearable != undefined){
                        isShowSuffix.value = true
                        clearShow.value = true
                    }
                }else{
                    pwdShow.value = false
                    clearShow.value = false
                    isShowSuffix.value = (props.suffixicon != undefined)
                }
            }
        }

        const handleSuffixClick = ()=>{
            inputRef.value.focus()
        }

        const handleIconPwdClick = ()=>{
            if (pwdIconName.value == 'hide'){
                pwdIconName.value = 'vew'
                inputType.value = 'text'
            }else{
                pwdIconName.value = 'hide'
                inputType.value = 'password'
            }
        }

        const handleIconClearClick = ()=>{
            inputRef.value.value = ''
            handleInputInput()
        }

        const initSuffix = ()=>{
            if (props.suffixicon != undefined){
                isShowSuffix.value = true
            }
        }

        initSuffix()

        return {isFocus ,inputRef, isShowSuffix ,iconName , suffixRef,
                inputType,pwdIconName ,pwdShow ,clearShow, computeClass,
                handleInputFocus ,handleInputBlur , handleSuffixClick ,handleInputInput ,
                handleIconPwdClick ,handleIconClearClick}
    }
})
</script>

<style lang="" scoped></style>
