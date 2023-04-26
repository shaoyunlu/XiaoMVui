<template>
    <xmv-popover placement="bottom" :ref="datePickerMode.popoverRef">
        <template #trigger>
            <xmv-input prefixicon="calendar" clearable v-if="type == 'date'" ref="inputRef"></xmv-input>
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
                <xmv-calendar :dMode="datePickerMode"></xmv-calendar>
                <xmv-calendar v-if="type == 'daterange'" :dMode="datePickerRightMode"></xmv-calendar>
            </div>
        </div>
        <div class="xmv-picker-panel__footer"></div>
    </div>
</template>

<script>
import {computed, defineComponent, onMounted, provide ,reactive ,ref} from 'vue'
import DatePickerMode from './mode/datePickerMode'
import StoreMode from './mode/storeMode'
import xmvCalendar from './calendar.vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvDatePicker",
    components:{xmvCalendar},
    props:{
        type : {type:String,default:'date'} //daterange
    },
    setup(props ,context) {
        const storeMode = new StoreMode()
        const datePickerMode = new DatePickerMode(props)
        const datePickerRightMode = new DatePickerMode(props)
        datePickerRightMode.dateObj = datePickerRightMode.dateObj.add(1 ,'month')
        datePickerRightMode.initDayMode()
        datePickerRightMode.pos = 'right'
        storeMode.leftDMode = datePickerMode
        storeMode.rightDMode = datePickerRightMode
        const inputRef = ref(null)

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        provide('DatePickerMode' ,datePickerMode)
        provide('DatePickerRightMode' ,datePickerRightMode)
        provide('StoreMode' ,storeMode)
        provide('EventBus' ,{$on ,$emit})

        const computePanelClass = computed(()=>{
            let res = []
            if (datePickerMode.type.value == 'date'){
                res.push('xmv-date-picker')
            }else if(datePickerMode.type.value == 'daterange'){
                res.push('xmv-date-range-picker')
            }
            return res
        })

        $on('tdClick' ,(data)=>{
            if (datePickerMode.type.value == 'date'){
                inputRef.value.val(data.format('YYYY-MM-DD'))
                datePickerMode.popoverRef.value.hide()
            }
        })

        onMounted(()=>{
            $emit('change')
        })

        return {datePickerMode ,datePickerRightMode ,computePanelClass ,inputRef}
    }
})
</script>

<style lang="" scoped></style>
