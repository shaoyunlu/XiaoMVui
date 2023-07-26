<template>
    <div class="xmv-tree-node__content" :style="computeStyle">
        <xmv-icon name="arrowRight" class="xmv-tree-node__expand-icon" 
        :class="computeIconClass" @click.stop="handleExpandIconClick"></xmv-icon>
        <xmv-checkbox v-if="treeMode.showCheckbox != undefined"
        @check="handleCheck" 
        :checkStatus="node.isChecked" 
        :indeterminateStatus="node.isIndeterminate"></xmv-checkbox>
        <xmv-icon name="loading" class="xmv-tree-node__loading-icon is-loading" v-if="node.isLoading"></xmv-icon>
        <xmv-tree-label :node="node"></xmv-tree-label>
    </div>
</template>

<script>
import {computed, defineComponent ,inject, onMounted} from 'vue'
import {isEmpty} from 'utils/data'
import xmvTreeLabel from './treeLabel.vue'
export default defineComponent({
    name:"",
    emits:['expandIconClick'],
    props:{
        node:Object
    },
    components:{xmvTreeLabel},
    setup({node} ,context) {

        const level = inject('Level')
        const treeMode = inject('TreeMode')

        const computeIconClass = computed(()=>{
            let res = []
            if (node.iconExpanded){
                res.push('expanded')
            }
            if (treeMode.lazy){
                // 节点已经加载过
                if (node.isLoaded){
                    if (isEmpty(node.children)){
                        res.push('is-leaf')
                    }
                }
            }else{
                if (isEmpty(node.children)){
                    res.push('is-leaf')
                }
            }
            return res
        })

        const computeStyle = computed(()=>{
            return {'padding-left' : level * 18 + 'px'}
        })

        const handleCheck = (checked)=>{
            node.isChecked = checked
            node.isIndeterminate = false
            treeMode.handleNodeCheck(node ,checked)
        }

        const handleExpandIconClick = ()=>{
            context.emit('expandIconClick')
        }

        return {treeMode ,computeStyle ,computeIconClass ,handleCheck ,handleExpandIconClick}
    }
})
</script>

<style lang="" scoped></style>
