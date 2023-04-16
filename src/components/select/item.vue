<template>
    <li class="xmv-select-dropdown__item" @mouseover="handleMouseover" @click="handleClick"
        :class="{'hover' : isHover  ,'selected' : isSelect}">
        <span>{{data.label}}</span>
    </li>
</template>

<script>
import {defineComponent, inject ,ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        data : Object
    },
    setup(props ,context) {

        const selectMode = inject('SelectMode')
        const {$on ,$emit} = inject('EventBus')
        const isHover = ref(false)
        const isSelect = ref(false)
        $on('itemClick' ,(data)=>{
            isSelect.value = (data.value == props.data.value)
        })

        const handleMouseover = ()=>{

        }

        const handleClick = ()=>{
            $emit('itemClick' ,props.data)
        }

        return {handleMouseover ,handleClick ,isHover ,isSelect}
    }
})
</script>

<style lang="" scoped></style>
