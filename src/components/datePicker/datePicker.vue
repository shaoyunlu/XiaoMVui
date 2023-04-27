<template>
    <xmv-popover placement="bottom" :ref="datePickerMode.popoverRef">
        <template #trigger>
            <xmv-input prefixicon="calendar" clearable v-if="type == 'date'" ref="inputRef"></xmv-input>
            <div v-if="type == 'daterange'" 
                class="xmv-date-editor xmv-date-editor--daterange xmv-input__wrapper 
                        xmv-range-editor xmv-range-editor--default"
                :class="{'is-active' : isActive}"
                @click="handleDateRangeMouseup"
                ref="daterangeRef">
                <xmv-icon name="calendar" class="xmv-input__icon xmv-range__icon"></xmv-icon>
                <input type="text" class="xmv-range-input" ref="leftInputRef">
                <span class="xmv-range-separator">到</span>
                <input type="text" class="xmv-range-input" ref="rightInputRef">
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
import {computed, defineComponent, onMounted, provide ,reactive ,ref ,inject} from 'vue'
import DatePickerMode from './mode/datePickerMode'
import StoreMode from './mode/storeMode'
import xmvCalendar from './calendar.vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvDatePicker",
    components:{xmvCalendar},
    props:{
        type : {type:String,default:'date'}, //daterange
        format : {type:String,default:'YYYY-MM-DD'},
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
        const leftInputRef = ref(null)
        const rightInputRef = ref(null)
        const daterangeRef = ref(null)
        const isActive = ref(false)

        const XmvEventOn = inject('Xmv-Event-On')

        XmvEventOn('mouseup' ,(e)=>{
            isActive.value = false
        })

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
                inputRef.value.val(data.format(props.format))
                datePickerMode.popoverRef.value.hide()
            }else if (datePickerMode.type.value == 'daterange'){
                if (storeMode.dateList.length != 2){
                    return false
                }
                let dateList = storeMode.dateList
                leftInputRef.value.value = dateList[0].format(props.format)
                rightInputRef.value.value = dateList[1].format(props.format)
                datePickerMode.popoverRef.value.hide()
            }
        })

        const handleDateRangeMouseup = ()=>{
            isActive.value = true
        }

        onMounted(()=>{
            $emit('change')
        })

        return {datePickerMode ,datePickerRightMode ,computePanelClass ,
                inputRef,leftInputRef,rightInputRef,daterangeRef,isActive,handleDateRangeMouseup}
    }
})
</script>

<style lang="" scoped></style>
