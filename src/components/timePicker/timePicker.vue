<template>
    <xmv-popover :beStripped="false" @show="handlePopoverShow">
        <template #trigger>
            <xmv-input class="xmv-date-editor xmv-date-editor--time" 
            prefixicon="clock" clearable ref="inputRef" @clear="handleClear"></xmv-input>
        </template>
    </xmv-popover>
    <div class="xmv-time-panel">
        <div class="xmv-time-panel__content has-seconds">
            <div class="xmv-time-spinner has-seconds">
                <xmv-time-hour @val="handleHourVal" ref="timeHourRef"></xmv-time-hour>
                <xmv-time-minute @val="handleMinuteVal" ref="timeMinuteRef"></xmv-time-minute>
                <xmv-time-second @val="handleSecondVal" ref="timeSecondRef"></xmv-time-second>
            </div>
        </div>
        <div class="xmv-time-panel__footer"></div>
    </div>
</template>

<script>
import {computed, defineComponent, onMounted, provide ,ref, watch} from 'vue'
import xmvTimeHour from './hour.vue'
import xmvTimeMinute from './minute.vue'
import xmvTimeSecond from './second.vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvTimePicker",
    props:{
        modelValue : String
    },
    components:{xmvTimeHour ,xmvTimeMinute ,xmvTimeSecond},
    setup(props ,context) {
        const inputRef = ref(null)
        const hourRef = ref('0')
        const minuteRef = ref('0')
        const secondRef = ref('0')

        const timeHourRef = ref(null)
        const timeMinuteRef = ref(null)
        const timeSecondRef = ref(null)

        provide('Hour' ,hourRef)
        provide('Minute' ,minuteRef)
        provide('Second' ,secondRef)

        const handleHourVal = ()=>{
            setVal()
        }

        const handleMinuteVal = ()=>{
            setVal()
        }

        const handleSecondVal = ()=>{
            setVal()
        }

        const handleClear = ()=>{
            context.emit('update:modelValue' ,'')
        }

        const zeroFill = (val)=>{
            if (val < 10){
                return '0' + val
            }
            return val
        }

        const modelValueWatch = computed(()=>{
            return props.modelValue
        })

        watch(modelValueWatch ,(newVal)=>{
            decomposeVal(newVal)
        })

        const dispatchVal = ()=>{
            timeHourRef.value.setVal(hourRef.value)
            timeMinuteRef.value.setVal(minuteRef.value)
            timeSecondRef.value.setVal(secondRef.value)
        }

        const decomposeVal = (val)=>{
            if (isEmpty(val)){
                return false
            }
            let list = val.split(':')
            hourRef.value = parseInt(list[0])
            minuteRef.value = parseInt(list[1])
            secondRef.value = parseInt(list[2])
            dispatchVal()
        }

        const setVal = ()=>{
            inputRef.value.val(
                    zeroFill(hourRef.value) + ":" 
                    + zeroFill(minuteRef.value) + ":" 
                    + zeroFill(secondRef.value))
            if (props.modelValue != undefined){
                context.emit('update:modelValue' ,inputRef.value.getVal())
            }
        }

        const handlePopoverShow = ()=>{
            dispatchVal()
        }

        onMounted(()=>{
            inputRef.value.setInputWidth(1)
            if (!isEmpty(props.modelValue)){
                decomposeVal(props.modelValue)
                inputRef.value.val(
                        zeroFill(hourRef.value) + ":" 
                        + zeroFill(minuteRef.value) + ":" 
                        + zeroFill(secondRef.value))
            }
        })

        return {hourRef ,minuteRef ,secondRef , timeHourRef,timeMinuteRef,timeSecondRef,
                 inputRef ,handleHourVal ,handleMinuteVal ,handleSecondVal ,handlePopoverShow ,handleClear}
    }
})
</script>

<style lang="" scoped></style>
