<template>
    <div class="xmv-picker-panel__content" :class="computeClass">
        <div :class="computeHeaderClass">
            <span class="xmv-date-picker__prev-btn">
                <button type="button" class="d-arrow-left xmv-picker-panel__icon-btn" v-if="shouldShowLeft"
                    @mouseup.stop="handleDArrowLeft">
                    <xmv-icon name="dArrowLeft"></xmv-icon>
                </button>
                <button type="button" class="xmv-picker-panel__icon-btn arrow-left" v-if="shouldShowLeft"
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
                <button type="button" class="xmv-picker-panel__icon-btn arrow-right" v-if="shouldShowRight"
                     @mouseup.stop="handleArrowRight">
                    <xmv-icon name="arrowRight"></xmv-icon>
                </button>
                <button type="button" class="xmv-picker-panel__icon-btn d-arrow-right" v-if="shouldShowRight"
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
                        <td v-for="tmp in rowList" 
                            :class="{'prev-month':tmp.prevMonth ,'next-month':tmp.nextMonth ,'available':tmp.available}">
                            <div class="xmv-date-table-cell">
                                <span class="xmv-date-table-cell__text">
                                    {{tmp.value}}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent, inject} from 'vue'
export default defineComponent({
    name:"",
    props:{
        pos : String
    },
    setup(props ,context) {

        const dMode = inject('DatePickerMode')

        const handleDArrowLeft = ()=>{
            if (dMode.type.value == 'date'){
                dMode.dateObj = dMode.dateObj.subtract(1,'year')
                dMode.initDayMode(dMode.dateObj)
            }
        }

        const handleArrowLeft = ()=>{
            if (dMode.type.value == 'date'){
                dMode.dateObj = dMode.dateObj.subtract(1,'month')
                dMode.initDayMode(dMode.dateObj)
            }
        }

        const handleDArrowRight = ()=>{
            if (dMode.type.value == 'date'){
                dMode.dateObj = dMode.dateObj.add(1,'year')
                dMode.initDayMode(dMode.dateObj)
            }
        }

        const handleArrowRight = ()=>{
            if (dMode.type.value == 'date'){
                dMode.dateObj = dMode.dateObj.add(1,'month')
                dMode.initDayMode(dMode.dateObj)
            }
        }

        const computeClass = computed(()=>{
            let res = []
            if (dMode.type.value == 'daterange'){
                res.push('xmv-date-range-picker__content')
                if (props.pos == 'left'){
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

        const shouldShowLeft = computed(()=>{
            if (dMode.type.value == 'date'){
                return true
            }else if(dMode.type.value == 'daterange'){
                return props.pos == 'left'
            }
            return true
        })

        const shouldShowRight = computed(()=>{
            if (dMode.type.value == 'date'){
                return true
            }else if(dMode.type.value == 'daterange'){
                return props.pos == 'right'
            }
            return true
        })

        return {dMode ,handleDArrowLeft ,handleArrowLeft ,handleDArrowRight ,handleArrowRight ,
                computeClass ,computeHeaderClass ,shouldShowLeft ,shouldShowRight}
    }
})
</script>

<style lang="" scoped></style>
