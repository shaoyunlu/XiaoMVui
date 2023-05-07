<template>
    <div class="xmv-tree">
        <xmv-tree-node v-for="node in treeMode.rctData.data" :node="node"></xmv-tree-node>
    </div>
</template>

<script>
import {defineComponent ,provide} from 'vue'
import TreeMode from './mode/treeMode';
export default defineComponent({
    name:"xmvTree",
    setup(props ,context) {
        const treeMode = new TreeMode()

        provide('Level' ,0)
        provide('TreeMode' ,treeMode)

        const loadData = (data)=>{
            treeMode.loadData(data)
        }

        return {treeMode ,loadData}
    }
})
</script>

<style lang="" scoped></style>
