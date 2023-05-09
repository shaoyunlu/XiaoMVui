<template>
    <div class="xmv-tree">
        <xmv-tree-node v-for="node in treeMode.rctData.data" :node="node"></xmv-tree-node>
    </div>
</template>

<script>
import {defineComponent ,provide ,reactive} from 'vue'
import TreeMode from './mode/treeMode';
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvTree",
    props:{
        showCheckbox : String,
        filterNodeMethod : {
            type : Function
        }
    },
    setup(props ,context) {
        const treeMode = new TreeMode(props)

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        treeMode.$on = $on
        treeMode.$emit = $emit

        provide('Level' ,0)
        provide('TreeMode' ,treeMode)
        provide('Slots' ,context.slots)

        const loadData = (data)=>{
            treeMode.loadData(data)
        }

        const filter = (label)=>{
            treeMode.filter(label)
        }

        return {treeMode ,loadData ,filter}
    }
})
</script>

<style lang="" scoped></style>
