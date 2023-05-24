<template>
    <xmv-select type="tree" ref="xmvSelectRef" 
    :multiple="multiple" :notAssociated="notAssociated"
    @nodeClick="handleNodeClick"></xmv-select>
</template>

<script>
import {defineComponent ,ref, watch ,onMounted} from 'vue'
import {deepClone ,isEmpty} from 'utils/data'
export default defineComponent({
    name:"",
    props:{
        multiple : String,
        notAssociated : String,
        data : Array,
        modelValue : String
    },
    setup(props ,context) {

        const xmvSelectRef = ref(null)

        const loadData = (data)=>{
            xmvSelectRef.value.loadTreeData(data)
        }

        const handleNodeClick = (node)=>{
            context.emit('update:modelValue' ,node.value)
        }

        watch(()=>props.data ,(newVal)=>{
            xmvSelectRef.value.loadTreeData(newVal)
        })

        watch(()=>props.modelValue ,(newVal)=>{
            handleWatch(newVal)
        })

        const handleWatch = (val)=>{
            xmvSelectRef.value.setTreeValue(val)
        }

        onMounted(()=>{
            if (!isEmpty(props.data)){
                xmvSelectRef.value.loadTreeData(props.data)
            }
            if (!isEmpty(props.modelValue)){
                handleWatch(props.modelValue)
            }
        })

        return {xmvSelectRef ,loadData ,handleNodeClick}
    }
})
</script>

<style lang="" scoped></style>
