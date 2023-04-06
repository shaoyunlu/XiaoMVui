<template>
    <tr class="xmv-table__row">
        <xmv-table-td v-for="header in tableMode.rctData.header" :header="header" :data="data"></xmv-table-td>
    </tr>
</template>

<script>
import {defineComponent, inject} from 'vue'
import XmvTableTd from './tableTd.vue'
export default defineComponent({
    name:"xmvTableTr",
    components:{XmvTableTd},
    props:{
        data : Object
    },
    setup(props ,context) {
        const tableMode = inject('TableMode')
        return {tableMode}
    }
})
</script>

<style lang="" scoped></style>
