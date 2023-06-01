<template>
    
</template>

<script>
import {defineComponent ,h ,inject} from 'vue'
export default defineComponent({
    name:"",
    props:{
        data : Object
    },
    setup({data} ,context) {

        let slots = data.slots

        return ()=>{
            let defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots)
            return h('div' ,{class:'xmv-tab-pane',style: data.isActive ? 'display: ""' : 'display: none' } ,defaultSlot)
        }
    }
})
</script>

<style lang="" scoped></style>
