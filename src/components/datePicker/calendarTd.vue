<template>
    <td @mouseup.stop="handleMouseUp" ref="tdRef"
        :class="{
                    'prev-month':data.prevMonth ,
                    'next-month':data.nextMonth ,
                    'available':data.available,
                    'current':isCurrent,
                    'today':isToday}">
        <div class="xmv-date-table-cell">
            <span class="xmv-date-table-cell__text" ref="spanRef">
                {{data.value}}
            </span>
        </div>
    </td>
</template>

<script>
import {defineComponent ,ref ,inject, onMounted, nextTick} from 'vue'
import {hasClass ,removeClass} from 'utils/dom'
export default defineComponent({
    name:"",
    props:{
        data : Object,
        dMode : Object
    },
    setup({dMode,data} ,context) {

        const storeMode = inject('StoreMode')
        const isCurrent = ref(false)
        const isToday = ref(false)
        const tdRef = ref(null)
        const spanRef = ref(null)

        const {$on ,$emit} = inject('CalendarEventBus')
        const {$on : aOn ,$emit : aEmit} = inject('EventBus')

        const handleMouseUp = ()=>{
            let dateObj = getDate()
            if (dMode.type.value == 'date'){
                storeMode.dateObj[dMode.pos] = dateObj
            }else if(dMode.type.value == 'daterange'){
                storeMode.handleList(dateObj)
            }
            
            $emit('tdClick' ,dateObj)
            aEmit('tdClick' ,dateObj)
        }

        const getDate = ()=>{
            let dateObj = dMode.dateObj
            if (hasClass(tdRef.value ,'prev-month')){
                dateObj = dMode.dateObj.subtract(1,'month')
            }else if(hasClass(tdRef.value ,'next-month')){
                dateObj = dMode.dateObj.add(1,'month')
            }
            return dateObj.date(spanRef.value.innerHTML)
        }

        aOn('tdClick' ,(cData)=>{
            nextTick(()=>{
                judgeCurrent()
            })
        })

        $on('change' ,()=>{
            nextTick(()=>{
                judgeToday()
                judgeCurrent()
            })
        })

        aOn('change' ,()=>{
            nextTick(()=>{
                judgeToday()
                judgeCurrent()
            })
        })

        aOn('removeCurrent' ,()=>{
            isCurrent.value = false
        })

        const judgeToday = ()=>{
            let dateObj = getDate()
            if (dateObj.isSame(dMode.todayObj,'day')){
                isToday.value = true
            }else{
                isToday.value = false
            }
        }

        const judgeCurrent = ()=>{
            isCurrent.value = false
            let dateObj = getDate()
            if (dMode.type.value == 'date')
            {
                isCurrent.value = dateObj.isSame(storeMode.dateObj[dMode.pos])
            }
            else if(dMode.type.value == 'daterange')
            {
                storeMode.dateList.forEach((__dateObj)=>{
                    if (dateObj.isSame(__dateObj)){
                        isCurrent.value = true
                    }
                })
            }
        }

        onMounted(()=>{
            judgeToday()
        })

        return {isCurrent,isToday,spanRef,tdRef,handleMouseUp}
    }
})
</script>

<style lang="" scoped></style>
