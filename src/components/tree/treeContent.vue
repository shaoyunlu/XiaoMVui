<template>
    <div class="xmv-tree-node__content" :style="computeStyle">
        <xmv-icon name="arrowRight" class="xmv-tree-node__expand-icon" 
        :class="computeIconClass"></xmv-icon>
        <xmv-checkbox @check="handleCheck" :checkStatus="node.isChecked" :indeterminateStatus="node.isIndeterminate"></xmv-checkbox>
        <xmv-tree-label :node="node"></xmv-tree-label>
    </div>
</template>

<script>
import {computed, defineComponent ,inject, onMounted} from 'vue'
import {isEmpty} from 'utils/data'
import xmvTreeLabel from './treeLabel.vue'
export default defineComponent({
    name:"",
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
            if (isEmpty(node.children)){
                res.push('is-leaf')
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

        return {computeStyle ,computeIconClass ,handleCheck}
    }
})
</script>

<style lang="" scoped></style>
