<template>
    <div class="xmv-table"  :class="computeTableClass" ref="tableRef" :style="computeTableStyle">
        <div class="xmv-table__inner-wrapper" :style="computeTableInnerStyle">
            <div class="hidden-columns">
                <slot></slot>
            </div>
            <div class="xmv-table__header-wrapper" ref="tableHeaderWrapperRef">
                <table class="xmv-table__header" border="0" cellpadding="0" cellspacing="0"
                :width="tableMode.rctData.tableWidth + 'px'">
                    <xmv-table-header></xmv-table-header>
                </table>
            </div>
            <div class="xmv-table__body-wrapper">
                <xmv-scrollbar @scroll="handleScroll" ref="scrollBarRef" 
                    :maxHeightFlag="scrollMaxHeightFlag" :maxHeight="scrollMaxHeight">
                    <table class="xmv-table__body" cellpadding="0" cellspacing="0" border="0"
                    :width="tableMode.rctData.tableWidth + 'px'">
                        <xmv-table-body></xmv-table-body>
                    </table>
                </xmv-scrollbar>
            </div>
        </div>
        <div class="xmv-table__column-resize-proxy"></div>
    </div>
</template>

<script>
import {defineComponent, onMounted, provide ,ref ,reactive, computed} from 'vue'
import TableMode from './mode/tableMode'

import XmvTableHeader from './tableHeader.vue'
import XmvTableBody from './tableBody.vue'

import {createEventBus} from 'utils/event'

export default defineComponent({
    name:"xmvTable",
    components:{XmvTableHeader,XmvTableBody},
    props:{
        height : {type : String},
        border : String,
        stripe : String,
        maxHeight : String
    },
    setup(props ,context) {

        const tableMode = new TableMode(props)
        const tableHeaderWrapperRef = ref(null)
        const tableRef = ref(null)
        const scrollBarRef = ref(null)
        const scrollMaxHeightFlag = ref(false)
        const scrollMaxHeight = ref(0)

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        tableMode.tableRef = tableRef

        provide('TableMode' ,tableMode)
        provide('EventBus' ,{$on ,$emit})

        const loadData = (data)=>{
            tableMode.rctData.data = data
        }

        const handleScroll = (info)=>{
            tableHeaderWrapperRef.value.scrollLeft = info.hor
        }

        const computeTableClass = computed(()=>{
            let res = []
            if (props.border != undefined){
                res.push('xmv-table--border')
            }
            if (props.stripe != undefined){
                res.push('xmv-table--striped')
            }
            return res
        })

        const computeTableStyle = computed(()=>{
            let res = {}
            if (props.maxHeight != undefined){
                res['max-height'] = props.maxHeight + 'px'
            }
            scrollMaxHeightFlag.value = true
            scrollMaxHeight.value = parseInt(props.maxHeight) - 40
            return res
        })

        const computeTableInnerStyle = computed(()=>{
            let res = {}
            res.height = (props.height != undefined ? (props.height + 'px') : 'auto')
            if (props.maxHeight != undefined){
                res['max-height'] = props.maxHeight + 'px'
            }
            return res
        })
        
        onMounted(()=>{
            tableMode.init()
        })

        return {tableHeaderWrapperRef , tableRef ,tableMode ,computeTableClass,
                computeTableStyle ,computeTableInnerStyle,scrollBarRef ,
                scrollMaxHeightFlag ,scrollMaxHeight ,
                loadData ,handleScroll}

    }
})
</script>

<style scoped lang="less">

</style>