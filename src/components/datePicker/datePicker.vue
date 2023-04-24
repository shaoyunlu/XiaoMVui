<template>
    <xmv-popover placement="bottom">
        <template #trigger>
            <xmv-input prefixicon="calendar" clearable v-if="type == 'date'"></xmv-input>
            <div v-if="type == 'daterange'" 
                class="xmv-date-editor xmv-date-editor--daterange xmv-input__wrapper 
                        xmv-range-editor xmv-range-editor--default">
                <xmv-icon name="calendar" class="xmv-input__icon xmv-range__icon"></xmv-icon>
                <input type="text" class="xmv-range-input">
                <span class="xmv-range-separator">到</span>
                <input type="text" class="xmv-range-input">
                <xmv-icon name="circleClose" class="xmv-input__icon xmv-range__close-icon"></xmv-icon>
            </div>
        </template>
    </xmv-popover>
    <div class="xmv-picker-panel" :class="computePanelClass">
        <div class="xmv-picker-panel__body-wrapper">
            <div class="xmv-picker-panel__body">
                <xmv-calendar pos="left"></xmv-calendar>
                <xmv-calendar v-if="type == 'daterange'" pos="right"></xmv-calendar>
            </div>
        </div>
        <div class="xmv-picker-panel__footer"></div>
    </div>
</template>

<script>
import {computed, defineComponent, provide} from 'vue'
import DatePickerMode from './mode/datePickerMode'
import xmvCalendar from './calendar.vue'
export default defineComponent({
    name:"xmvDatePicker",
    components:{xmvCalendar},
    props:{
        type : {type:String,default:'date'} //daterange
    },
    setup(props ,context) {
        const datePickerMode = new DatePickerMode(props)

        provide('DatePickerMode' ,datePickerMode)


        const computePanelClass = computed(()=>{
            let res = []
            if (datePickerMode.type.value == 'date'){
                res.push('xmv-date-picker')
            }else if(datePickerMode.type.value == 'daterange'){
                res.push('xmv-date-range-picker')
            }
            return res
        })

        return {datePickerMode ,computePanelClass}
    }
})
</script>

<style lang="" scoped></style>
