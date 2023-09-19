<template>
    <tr class="xmv-table__row" :class="computeTrClass" @click="handleTrClick">
        <xmv-table-td v-for="header in tableMode.rctData.header" :header="header" :data="data" :index="index"></xmv-table-td>
    </tr>
    <xmv-table-tr
        v-if="data.xmvIsExpand"
        v-for="(cData,cIndex) in data.children" 
        :data="cData" 
        :key="cIndex" 
        :index="cIndex"></xmv-table-tr>
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

        const computeTrClass = computed(()=>{
            let res = []
            if (data.xmvTrStatus){
                res.push(data.xmvTrStatus + '-row')
            }
            if (tableMode.option.stripe != undefined){
                if (index%2 != 0){
                    res.push('xmv-table__row--striped')
                }
            }
            if (data.checked){
                res.push('current-row')
            }
            if (data.xmvDepth != 0){
                res.push('xmv-table__row--level-' + data.xmvDepth)
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
