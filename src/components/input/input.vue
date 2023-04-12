<template>
    <div class="xmv-input" :class="{'is-disabled' : computeDisabled}">
        <div class="xmv-input__wrapper" :class="{'is-focus' : isFocus}">
            <input class="xmv-input__inner" 
                :type="inputType" 
                autocomplete="off"
                ref="inputRef"
                :placeholder="placeholder" @click="handleInputClick" 
                @focus="handleInputFocus" @blur="handleInputBlur"
                @input="handleInputInput">
            <span class="xmv-input__suffix" v-if="isShowSuffix" ref="suffixRef" @click="handleSuffixClick">
                <span class="xmv-input__suffix-inner">
                    <xmv-icon :name="pwdIconName" class="xmv-input__icon" v-if="showpassword != undefined"
                    @click="handleIconPwdClick"></xmv-icon>
                    <xmv-icon name="circleClose" class="xmv-input__icon" v-if="clearable != undefined"
                    @click="handleIconCloseClick"></xmv-icon>
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
        clearable : String
    },
    setup(props ,context) {

        const isFocus = ref(false)
        const inputRef = ref(null)
        const isShowSuffix = ref(false)
        const iconName = ref('')
        const pwdIconName = ref('hide')
        const suffixRef = ref(null)
        const inputType = ref(props.type)

        const handleInputFocus = ()=>{
            isFocus.value = true
        }

        const handleInputBlur = ()=>{
            isFocus.value = false
        }

        const handleInputInput = ()=>{
            if (props.clearable != undefined){
                // 判断输入框里是否有值
                if (inputRef.value.value){
                    isShowSuffix.value = true
                }else{
                    isShowSuffix.value = false
                }
            }
        }

        const computeDisabled = computed(()=>{
            return props.disabled != undefined
        })

        const handleInputClick = ()=>{
            
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

        const handleIconCloseClick = ()=>{
            inputRef.value.value = ''
            isShowSuffix.value = false
        }

        const initSuffix = ()=>{
            if (props.showpassword != undefined){
                isShowSuffix.value = true
            }
        }

        initSuffix()

        return {isFocus ,inputRef, isShowSuffix ,iconName , suffixRef, computeDisabled,
                inputType,pwdIconName ,
                handleInputClick ,handleInputFocus ,handleInputBlur , handleSuffixClick ,handleInputInput ,
                handleIconPwdClick ,handleIconCloseClick}
    }
})
</script>

<style lang="" scoped></style>
