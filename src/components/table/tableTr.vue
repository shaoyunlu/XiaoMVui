<template>
    <tr class="xmv-table__row" :class="computeTrClass">
        <xmv-table-td v-for="header in tableMode.rctData.header" :header="header" :data="data"></xmv-table-td>
    </tr>
</template>

<script>
import {computed, defineComponent, inject} from 'vue'
import XmvTableTd from './tableTd.vue'
export default defineComponent({
    name:"xmvTableTr",
    components:{XmvTableTd},
    props:{
        data : Object,
        index : Number
    },
    setup({data ,index} ,context) {
        const tableMode = inject('TableMode')
        // 建立索引
        data.xmvIndex = index
        const computeTrClass = computed(()=>{
            let res = []
            if (data.trStatus){
                res.push(data.trStatus + '-row')
            }
            if (tableMode.option.stripe != undefined){
                if (index%2 != 0){
                    res.push('xmv-table__row--striped')
                }
            }
            return res
        })
        return {tableMode ,computeTrClass}
    }
})
</script>

<style lang="" scoped></style>
