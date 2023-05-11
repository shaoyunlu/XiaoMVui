<template>
    <xmv-select type="tree" ref="xmvSelectRef" :multiple="multiple" :notAssociated="notAssociated"></xmv-select>
</template>

<script>
import {defineComponent ,ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        multiple : String,
        notAssociated : String
    },
    setup(props ,context) {

        const xmvSelectRef = ref(null)

        const loadData = (data)=>{
            xmvSelectRef.value.loadTreeData(data)
        }

        return {xmvSelectRef ,loadData}
    }
})
</script>

<style lang="" scoped></style>
