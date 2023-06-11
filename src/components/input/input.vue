<template>
    <div :class="computeClass" ref="xmvInputRef">
        <div class="xmv-input__wrapper" :class="{'is-focus' : isFocus}" v-if="type != 'textarea'">
            <span class="xmv-input__prefix" v-if="isShowPrefix" @click="handlePrefixClick">
                <span class="xmv-input__prefix-inner">
                    <xmv-icon :name="prefixicon" class="xmv-input__icon"></xmv-icon>
                </span>
            </span>
            <input class="xmv-input__inner" 
                :type="inputType" 
                autocomplete="off"
                ref="inputRef"
                :disabled="computeDisable"
                :placeholder="placeholder"
                @focus="handleInputFocus" @blur="handleInputBlur"
                @input="handleInputInput"
                :value="modelValue" v-if="modelValue != undefined">
            <input class="xmv-input__inner" 
                :type="inputType" 
                autocomplete="off"
                ref="inputRef"
                :placeholder="placeholder"
                @focus="handleInputFocus" @blur="handleInputBlur"
                @input="handleInputInput" v-else>
            <span class="xmv-input__suffix" v-if="isShowSuffix" ref="suffixRef" @click="handleSuffixClick">
                <span class="xmv-input__suffix-inner">
                    <xmv-icon :name="pwdIconName" class="xmv-input__icon" v-if="pwdShow"
                    @mouseup="handleIconPwdClick"></xmv-icon>
                    <xmv-icon name="circleClose" class="xmv-input__icon" v-if="clearShow"
                    @mouseup="handleIconClearClick"></xmv-icon>
                    <xmv-icon :name="suffixicon"  class="xmv-input__icon" v-if="suffixicon != undefined" ref="suffixiconRef"></xmv-icon>
                </span>
            </span>
        </div>
        <textarea class="xmv-textarea__inner"  
            :placeholder="placeholder"  :rows="rows"
            :style="computeTextareaStyle"
            :value="modelValue" ref="inputRef" @input="handleInputInput" v-else></textarea>
    </div>
</template>

<script>
import {defineComponent ,ref ,computed ,onMounted, nextTick, watch} from 'vue'
import {addClass ,removeClass} from 'utils/dom'
import {isFirefox} from 'utils/dict'
import {resizeOB} from 'utils/event'
export default defineComponent({
    name:"xmvInput",
    emits:['blur','clear','update:modelValue'],
    props:{
        disabled : Boolean,
        type : {type:String ,default:'text'},
        placeholder : {type:String ,default:'请输入'},
        showpassword : String,
        prefixicon : String,
        suffixicon : String,
        clearable : String,
        size : String,
        modelValue : String,
        rows:Number,
        autosize:Object
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

        const minRowsRef = ref(1)
        const textareaHeightRef = ref(null)
        const maxTextareaHeightRef = ref(9999)

        const computeClass = computed(()=>{
            let res = []
            if (props.type != 'textarea'){
                res.push('xmv-input')
            }else{
                res.push('xmv-textarea')
            }
            if (props.disabled){
                res.push('is-disabled')
            }
            if (props.size != undefined){
                res.push('xmv-input--' + props.size)
            }
            return res
        })

        const computeTextareaStyle = computed(()=>{
            if (props.type != 'textarea' || props.autosize == undefined){
                return false
            }
            let res = {}
            res['min-height'] = 31 + (minRowsRef.value - 1) * 21 + 'px'
            res['height'] = textareaHeightRef.value + 'px'
            return res
        })

        const computeDisable = computed(()=>{
            return props.disabled
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
            if (props.modelValue != undefined){
                if (props.type == 'textarea' && props.autosize != undefined){
                    aujustTextareaHeight()
                }
                context.emit('update:modelValue' ,inputRef.value.value)
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
            context.emit('clear')
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

        const getVal = ()=>{
            return inputRef.value.value
        }

        const setInputWidth = (width)=>{
            inputRef.value.style.width = width + 'px'
        }

        initPrefix()

        initSuffix()

        const aujustTextareaHeight = ()=>{
            inputRef.value.style.height = 'auto'
            let scrollHeight = inputRef.value.scrollHeight
            if (scrollHeight >= maxTextareaHeightRef.value){
                scrollHeight = maxTextareaHeightRef.value
            }
            textareaHeightRef.value = scrollHeight
        }

        watch(()=>props.modelValue ,()=>{
            if (props.type == 'textarea' && props.autosize != undefined){
                aujustTextareaHeight()
            }
        })

        onMounted(()=>{
            // 前后都有图标的时候，需要显示设置inputRef的值
            if (isFirefox && props.prefixicon != undefined && props.suffixicon != undefined){
                inputRef.value.style.width = '1px'
            }

            if (props.type == 'textarea' && props.autosize != undefined){
                if (typeof props.autosize === 'object'){
                    let {minRows ,maxRows} = props.autosize
                    minRowsRef.value = minRows
                    maxTextareaHeightRef.value = 31 + (maxRows-1)*21
                }
                aujustTextareaHeight()
            }
        })

        return {isFocus ,xmvInputRef ,inputRef, isShowPrefix ,isShowSuffix ,iconName , suffixRef,
                inputType,pwdIconName ,pwdShow ,clearShow, computeClass, suffixiconRef,computeDisable,
                computeTextareaStyle,minRowsRef,textareaHeightRef,
                handleInputFocus ,handleInputBlur , handlePrefixClick ,handleSuffixClick ,handleInputInput ,
                handleIconPwdClick ,handleIconClearClick ,focus ,val ,setInputWidth ,getVal}
    }
})
</script>

<style lang="" scoped></style>
