<template>
    <div class="xmv-picker-panel__content" :class="computeClass">
        <div :class="computeHeaderClass">
            <span class="xmv-date-picker__prev-btn" >
                <button type="button" class="d-arrow-left xmv-picker-panel__icon-btn"
                    v-if="leftSideDButton"
                    @mouseup.stop="handleDArrowLeft">
                    <xmv-icon name="dArrowLeft"></xmv-icon>
                </button>
                <button type="button" class="xmv-picker-panel__icon-btn arrow-left"
                    v-if="leftSideButton"
                    @mouseup.stop="handleArrowLeft">
                    <xmv-icon name="arrowLeft"></xmv-icon>
                </button>
            </span>
            <span v-if="dMode.type.value != 'daterange'" role="button" class="xmv-date-picker__header-label">
                {{dMode.rctData.year}}
            </span>
            <span v-if="dMode.type.value != 'daterange'" role="button" class="xmv-date-picker__header-label">
                {{dMode.rctData.month}}
            </span>
            <span class="xmv-date-picker__next-btn">
                <button type="button" class="xmv-picker-panel__icon-btn arrow-right"
                     v-if="rightSideButton"
                     @mouseup.stop="handleArrowRight">
                    <xmv-icon name="arrowRight"></xmv-icon>
                </button>
                <button type="button" class="xmv-picker-panel__icon-btn d-arrow-right"
                    v-if="rightSideDButton"
                    @mouseup.stop="handleDArrowRight">
                    <xmv-icon name="dArrowRight"></xmv-icon>
                </button>
            </span>
            <div v-if="dMode.type.value == 'daterange'">{{dMode.rctData.year}} {{dMode.rctData.month}}</div>
        </div>
        <div class="xmv-picker-panel__content">
            <table class="xmv-date-table">
                <tbody>
                    <tr>
                        <th v-for="tmp in dMode.weekHeader">{{tmp}}</th>
                    </tr>
                    <tr class="xmv-date-table__row" v-for="rowList in dMode.rctData.dayList">
                        <xmv-calendar-td v-for="tmp in rowList" :data="tmp" :dMode="dMode"></xmv-calendar-td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent, inject ,nextTick,provide,reactive ,ref} from 'vue'
import xmvCalendarTd from './calendarTd.vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"",
    props:{
        dMode : Object
    },
    components:{xmvCalendarTd},
    setup({dMode} ,context) {

        const storeMode = inject('StoreMode')
        const leftSideDButton = ref(true)
        const leftSideButton = ref(true)
        const rightSideButton = ref(true)
        const rightSideDButton = ref(true)

        const {$on : aOn ,$emit : aEmit} = inject('EventBus')

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)
        provide('CalendarEventBus' ,{$on ,$emit})

        const handleDArrowLeft = ()=>{
            dMode.dateObj = dMode.dateObj.subtract(1,'year')
            dMode.initDayMode()
            $emit('change')
            aEmit('change')
        }

        const handleArrowLeft = ()=>{
            
            dMode.dateObj = dMode.dateObj.subtract(1,'month')
            dMode.initDayMode()
            $emit('change')
            aEmit('change')
        }

        const handleDArrowRight = ()=>{
            dMode.dateObj = dMode.dateObj.add(1,'year')
            dMode.initDayMode()
            $emit('change')
            aEmit('change')
        }

        const handleArrowRight = ()=>{
            dMode.dateObj = dMode.dateObj.add(1,'month')
            dMode.initDayMode()
            $emit('change')
            aEmit('change')
        }

        aOn('change' ,()=>{
            judgeButtonShow()
        })

        const judgeButtonShow = ()=>{
            if (dMode.type.value == 'date'){
                return false
            }

            let leftMode = storeMode.leftDMode
            let rightMode = storeMode.rightDMode
            let differMonth = rightMode.dateObj.diff(leftMode.dateObj, 'month')
            let differYear = rightMode.dateObj.diff(leftMode.dateObj, 'year')
            if (differMonth > 1)
            {
                leftSideButton.value = true
                rightSideButton.value = true
            }
            else{
                if (dMode.pos == 'left'){
                    leftSideButton.value = true
                    rightSideButton.value = false
                }else{
                    leftSideButton.value = false
                    rightSideButton.value = true
                }
            }
            if (differYear > 0)
            {
                leftSideDButton.value = true
                rightSideDButton.value = true
            }
            else{
                if (dMode.pos == 'left'){
                    leftSideDButton.value = true
                    rightSideDButton.value = false
                }else{
                    leftSideDButton.value = false
                    rightSideDButton.value = true
                }
            }
        }

        const computeClass = computed(()=>{
            let res = []
            if (dMode.type.value == 'daterange'){
                res.push('xmv-date-range-picker__content')
                if (dMode.pos == 'left'){
                    res.push('is-left')
                }else{
                    res.push('is-right')
                }
                
            }
            return res
        })

        const computeHeaderClass = computed(()=>{
            let res = []

            if (dMode.type.value == 'daterange'){
                res.push('xmv-date-range-picker__header')
            }else if (dMode.type.value == 'date'){
                res.push('xmv-date-picker__header')
            }

            return res
        })

        return {handleDArrowLeft ,handleArrowLeft ,
                handleDArrowRight ,handleArrowRight ,judgeButtonShow,
                computeClass ,computeHeaderClass ,leftSideButton ,rightSideButton,
                leftSideDButton ,rightSideDButton}
    }
})
</script>

<style lang="" scoped></style>
