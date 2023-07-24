<template>
    <div class="xmv-tree-node"
        ref="nodeRef"
        draggable="true"
        @dragstart.stop="handleDragStart"
        @dragenter.stop="handleDragEnter"
        @dragleave.stop="handleDragLeave"
        @dragover.stop="handleDragOver"
        @drop.stop="handleDrop"
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

        const nodeRef = ref(null)

        const handleClick = ()=>{
            treeMode.handleNodeClick(node)
        }

        const handleExpandIconClick = ()=>{
            treeMode.handleExpandIconClick(node ,subRef)
        }

        treeMode.$on('nodeClick' ,(tmpNode)=>{
            node.isCurrent = (node === tmpNode)
        })

        const handleDragStart = (e)=>{
            treeMode.$emit('node-drag-start' ,node)
        }

        const handleDragEnter = (e)=>{
            e.preventDefault()
            if (treeMode.currentDropEnterNode === node){

            }else{
                treeMode.currentDropEnterNode = node
                treeMode.$emit('node-drag-enter' ,node)
            }     
        }

        const handleDragOver = (e)=>{
            e.preventDefault()
            treeMode.$emit('node-drag-over' ,node)
        }

        const handleDragLeave = (e)=>{
            e.preventDefault()
            if (treeMode.currentDropEnterNode !== node){
                treeMode.$emit('node-drag-leave' ,node)
            }
        }

        const handleDrop = (e)=>{
            e.preventDefault()
            treeMode.$emit('node-drop' ,node)
        }

        onMounted(()=>{
            if (parent != undefined){
                node.parent = parent
            }
        })

        return {treeMode ,subRef , nodeRef,handleClick ,handleExpandIconClick ,
                handleDragStart ,handleDragOver ,handleDragEnter ,handleDragLeave ,handleDrop}
    }
})
</script>

<style lang="" scoped></style>
