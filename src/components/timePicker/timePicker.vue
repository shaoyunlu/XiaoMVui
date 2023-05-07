<template>
    <xmv-popover :beStripped="false">
        <template #trigger>
            <xmv-input class="xmv-date-editor xmv-date-editor--time" prefixicon="clock" clearable ref="inputRef"></xmv-input>
        </template>
    </xmv-popover>
    <div class="xmv-time-panel">
        <div class="xmv-time-panel__content has-seconds">
            <div class="xmv-time-spinner has-seconds">
                <xmv-time-hour></xmv-time-hour>
                <xmv-time-minute></xmv-time-minute>
                <xmv-time-second></xmv-time-second>
            </div>
        </div>
        <div class="xmv-time-panel__footer"></div>
    </div>
</template>

<script>
import {defineComponent, onMounted, provide ,ref, watch} from 'vue'
import xmvTimeHour from './hour.vue'
import xmvTimeMinute from './minute.vue'
import xmvTimeSecond from './second.vue'
export default defineComponent({
    name:"xmvTimePicker",
    components:{xmvTimeHour ,xmvTimeMinute ,xmvTimeSecond},
    setup(props ,context) {
        const inputRef = ref(null)
        const hourRef = ref('0')
        const minuteRef = ref('0')
        const secondRef = ref('0')

        provide('Hour' ,hourRef)
        provide('Minute' ,minuteRef)
        provide('Second' ,secondRef)

        watch(hourRef ,(newVal ,oldVal)=>{
            setVal()
        })

        watch(minuteRef ,(newVal ,oldVal)=>{
            setVal()
        })

        watch(secondRef ,(newVal ,oldVal)=>{
            setVal()
        })

        const zeroFill = (val)=>{
            if (val < 10){
                return '0' + val
            }
            return val
        }

        const setVal = ()=>{
            inputRef.value.val(
                    zeroFill(hourRef.value) + ":" 
                    + zeroFill(minuteRef.value) + ":" 
                    + zeroFill(secondRef.value))
        }

        onMounted(()=>{
            inputRef.value.setInputWidth(1)
        })

        return {hourRef ,minuteRef ,secondRef ,inputRef}
    }
})
</script>

<style lang="" scoped></style>
