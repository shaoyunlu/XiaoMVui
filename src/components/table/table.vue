<template>
    <div class="xmv-table">
        <div class="xmv-table__inner-wrapper">
            <div class="hidden-columns"></div>
            <div class="xmv-table__header-wrapper">
                <table class="xmv-table__header" border="0" cellpadding="0" cellspacing="0">
                    <colgroup>
                        <col v-for="head in tableMode.rctData.header" :width="head.width">
                    </colgroup>
                    <thead class>
                        <tr class>
                            <th v-for="head in tableMode.rctData.header"
                                class="xmv-table__cell">
                                <div class="cell">
                                    {{head.name}}
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="xmv-table__body-wrapper">
                <xmv-scrollbar>
                    <table class="xmv-table__body" cellpadding="0" cellspacing="0" border="0">
                    <colgroup>
                        <col v-for="head in tableMode.rctData.header" :width="head.width">
                    </colgroup>
                    <tbody>
                        <tr v-for="trData in tableMode.rctData.data" class="xmv-table__row">
                            <td v-for="head in tableMode.rctData.header" class="xmv-table__cell">
                                <div class="cell">
                                    {{trData[head.key]}}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </xmv-scrollbar>
            </div>
        </div>
        <div class="xmv-table__column-resize-proxy"></div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import TableMode from './mode/tableMode';
export default defineComponent({
    name:"xmvTable",
    props:{
        header : Array
    },
    setup(props ,context) {

        const tableMode = new TableMode(props)

        const loadData = (data)=>{
            tableMode.rctData.data = data
        }

        return {tableMode ,loadData}

    }
})
</script>

<style scoped lang="less">

</style>