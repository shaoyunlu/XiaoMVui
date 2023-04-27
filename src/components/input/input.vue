<template>
    <div class="xmv-input" :class="computeClass" ref="xmvInputRef">
        <div class="xmv-input__wrapper" :class="{'is-focus' : isFocus}">
            <span class="xmv-input__prefix" v-if="isShowPrefix" @click="handlePrefixClick">
                <span class="xmv-input__prefix-inner">
                    <xmv-icon :name="prefixicon" class="xmv-input__icon"></xmv-icon>
                </span>
            </span>
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
                    <xmv-icon :name="suffixicon"  class="xmv-input__icon" v-if="suffixicon != undefined" ref="suffixiconRef"></xmv-icon>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import {defineComponent ,ref ,computed} from 'vue'
import {addClass ,removeClass} from 'utils/dom'
export default defineComponent({
    name:"xmvInput",
    emits:['blur'],
    props:{
        disabled : String,
        type : {type:String ,default:'text'},
        placeholder : {type:String ,default:'请输入'},
        showpassword : String,
        prefixicon : String,
        suffixicon : String,
        clearable : String,
        size : String
    },
    setup(props ,context) {

        const xmvInputRef = ref(null)
        const isFocus = ref(false)
        const inputRef = ref(null)
        const isShowPrefix = ref(false)
        const isShowSuffix = ref(false)
        const iconName = ref('')
        const suffixiconRef = ref(null)
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

        const handleInputBlur = (e)=>{
            isFocus.value = false
            context.emit('blur' ,e)
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

        const handlePrefixClick = ()=>{
            inputRef.value.focus()
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

        const initPrefix = ()=>{
            if (props.prefixicon != undefined){
                isShowPrefix.value = true
            }
        }

        const initSuffix = ()=>{
            if (props.suffixicon != undefined){
                isShowSuffix.value = true
            }
        }

        const focus = ()=>{
            inputRef.value.focus()
        }

        const val =(value)=>{
            inputRef.value.value = value
            handleInputInput()
        }

        const enable = ()=>{
            removeClass(xmvInputRef.value ,'is-disabled')
        }

        const disabled = ()=>{
            addClass(xmvInputRef.value ,'is-disabled')
        }

        initPrefix()

        initSuffix()

        return {isFocus ,xmvInputRef ,inputRef, isShowPrefix ,isShowSuffix ,iconName , suffixRef,
                inputType,pwdIconName ,pwdShow ,clearShow, computeClass, suffixiconRef,
                handleInputFocus ,handleInputBlur , handlePrefixClick ,handleSuffixClick ,handleInputInput ,
                handleIconPwdClick ,handleIconClearClick ,focus ,val ,enable ,disabled}
    }
})
</script>

<style lang="" scoped></style>
