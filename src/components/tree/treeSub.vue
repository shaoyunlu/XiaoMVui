<template>
    <div class="xmv-tree-node__children" ref="childrenDivRef">
        <xmv-tree-node v-for="tmp in node.children" :node="tmp"></xmv-tree-node>
    </div>
</template>

<script>
import {defineComponent ,provide ,inject, onMounted ,ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node : Object
    },
    setup({node} ,context) {

        const childrenDivRef = ref(null)

        provide('Level' ,inject('Level') + 1)

        return {childrenDivRef}
    }
})
</script>

<style lang="" scoped></style>
