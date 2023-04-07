<template>
    <div class="xmv-table" ref="tableRef">
        <div class="xmv-table__inner-wrapper" :style="{height:height?height+'px':'auto'}">
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
                <xmv-scrollbar @scroll="handleScroll">
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
import {defineComponent, onMounted, provide ,ref} from 'vue'
import TableMode from './mode/tableMode';

import XmvTableHeader from './tableHeader.vue'
import XmvTableBody from './tableBody.vue'


export default defineComponent({
    name:"xmvTable",
    components:{XmvTableHeader,XmvTableBody},
    props:{
        height : {type : String}
    },
    setup(props ,context) {

        const tableMode = new TableMode(props)
        const tableHeaderWrapperRef = ref(null)
        const tableRef = ref(null)

        tableMode.tableRef = tableRef

        provide('TableMode' ,tableMode)

        const loadData = (data)=>{
            tableMode.rctData.data = data
        }

        const handleScroll = (info)=>{
            tableHeaderWrapperRef.value.scrollLeft = info.hor
        }
        
        onMounted(()=>{
            tableMode.init()
        })

        return {tableHeaderWrapperRef , tableRef ,tableMode ,
                loadData ,handleScroll}

    }
})
</script>

<style scoped lang="less">

</style>