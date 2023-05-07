<template>
    <div class="xmv-tree-node" 
        :class="{'is-expanded' : node.isExpanded ,
                 'is-current' : node.isCurrent ,
                 'is-focusable':node.isFocusable}" @click.stop="handleClick">
        <tree-content :node="node"></tree-content>
        <tree-sub :node="node" v-show="node.isExpanded" ref="subRef"></tree-sub>
    </div>
</template>

<script>
import {defineComponent, inject, ref} from 'vue'
import treeContent from './treeContent.vue'
import treeSub from './treeSub.vue'
export default defineComponent({
    name:"xmvTreeNode",
    components:{treeContent ,treeSub},
    props:{
        node : Object
    },
    setup({node} ,context) {

        const treeMode = inject('TreeMode')
        const subRef = ref(null)

        const handleClick = ()=>{
            treeMode.handleNodeClick(node ,subRef)
        }

        return {treeMode ,subRef ,handleClick}
    }
})
</script>

<style lang="" scoped></style>
