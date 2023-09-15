<template>
    <tr class="xmv-table__row" :class="computeTrClass" @click="handleTrClick">
        <xmv-table-td v-for="header,index in tableMode.rctData.header" :header="header" :data="data"></xmv-table-td>
    </tr>
    <tr v-if="isExpandTr"></tr>
</template>

<script>
import {computed, defineComponent, inject ,ref} from 'vue'
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
        const isExpandTr = ref(false)
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
            if (data.checked){
                res.push('current-row')
            }
            return res
        })
        const handleTrClick = ()=>{
            if (tableMode.option.highlightCurrentRow){
                tableMode.$emit('trClick' ,index)
            }
        }

        tableMode.$on('trClick' ,__index =>{
            data.checked = (index == __index)
        })
        return {tableMode ,computeTrClass ,handleTrClick ,isExpandTr}
    }
})
</script>

<style lang="" scoped></style>
