<template>
    <colgroup>
        <col v-for="head in tableMode.rctData.header" :width="head.width">
    </colgroup>
    <thead class>
        <tr class>
            <th v-for="head in tableMode.rctData.header"
                class="xmv-table__cell">
                <div class="cell">
                    {{head.label}}
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
import {defineComponent, inject} from 'vue'
export default defineComponent({
    name:"xmvTableHeader",
    setup(props ,context) {
        const tableMode = inject('TableMode')
        return {tableMode}
    }
})
</script>

<style lang="" scoped></style>
