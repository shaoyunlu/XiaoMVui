<template>
    <div class="xmv-tree">
        <xmv-tree-node v-for="node in treeMode.rctData.data" :node="node" :key="node.value"></xmv-tree-node>
    </div>
</template>

<script>
import {defineComponent ,nextTick,provide ,reactive} from 'vue'
import TreeMode from './mode/treeMode';
import {createEventBus} from 'utils/event'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvTree",
    emits:['nodeClick' ,'nodeCheck'],
    props:{
        showCheckbox : String,
        filterNodeMethod : {
            type : Function
        },
        notAssociated : String  // 父子节点是否相关联
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
        provide('EventBus' ,{$on ,$emit})

        $on('nodeClick' ,(node)=>{
            context.emit('nodeClick' ,node)
        })

        $on('nodeCheck' ,(nodeList)=>{
            context.emit('nodeCheck' ,nodeList)
        })

        const loadData = (data)=>{
            treeMode.loadData(data)
        }

        const filter = (label)=>{
            treeMode.filter(label)
        }

        const setValue = (val)=>{
            let node = treeMode.findNodeByParam(treeMode.rctData.data ,val)
            let parentNodes = treeMode.findParents(treeMode.rctData.data ,val)
            parentNodes.forEach(parentNode =>{
                parentNode.isExpanded = true
            })

            nextTick(()=>{
                treeMode.handleNodeClick(node)
            })
        }

        return {treeMode ,loadData ,filter ,setValue}
    }
})
</script>

<style lang="" scoped></style>
