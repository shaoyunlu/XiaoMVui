<template>
    <div class="xmv-tree-node" 
        :class="{'is-expanded' : node.isExpanded ,
                 'is-current' : node.isCurrent ,
                 'is-focusable':node.isFocusable,
                 'is-hidden':node.isHidden}" @click.stop="handleClick">
        <tree-content :node="node" @expandIconClick="handleExpandIconClick"></tree-content>
        <tree-sub :node="node" v-show="node.isExpanded" ref="subRef"></tree-sub>
    </div>
</template>

<script>
import {defineComponent, inject, onMounted, ref, watch} from 'vue'
import treeContent from './treeContent.vue'
import treeSub from './treeSub.vue'
export default defineComponent({
    name:"xmvTreeNode",
    components:{treeContent ,treeSub},
    props:{
        node : Object,
        parent : Object
    },
    setup({node ,parent} ,context) {

        const treeMode = inject('TreeMode')
        const subRef = ref(null)

        const handleClick = ()=>{
            treeMode.handleNodeClick(node)
        }

        const handleExpandIconClick = ()=>{
            treeMode.handleExpandIconClick(node ,subRef)
        }

        treeMode.$on('nodeClick' ,(tmpNode)=>{
            node.isCurrent = (node === tmpNode)
        })

        onMounted(()=>{
            if (parent != undefined){
                node.parent = parent
            }
        })

        return {treeMode ,subRef ,handleClick ,handleExpandIconClick}
    }
})
</script>

<style lang="" scoped></style>
