<template>
    <div class="xmv-tree-node__content" :style="computeStyle">
        <xmv-icon name="arrowRight" class="xmv-tree-node__expand-icon" 
        :class="computeIconClass"></xmv-icon>
        <span class="xmv-tree-node__label">
            {{node.label}}
        </span>
    </div>
</template>

<script>
import {computed, defineComponent ,inject} from 'vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup({node} ,context) {

        const level = inject('Level')

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

        return {computeStyle ,computeIconClass}
    }
})
</script>

<style lang="" scoped></style>
