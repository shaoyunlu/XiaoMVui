<template>

</template>

<script>
import {computed, defineComponent, h} from 'vue'
export default defineComponent({
    name:"xmvSpace",
    props:{
        size : {type:Number ,default : 8},
        fill : {type:Boolean ,default : false},
        wrap : {type:Boolean ,default : true}
    },
    setup({size ,fill ,wrap} ,{slots}) {

        return ()=>{
            let renderSlot = []
            let defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots)
            if (defaultSlot[0] && defaultSlot[0].children){
                defaultSlot[0].children.forEach(slot =>{
                    renderSlot.push(h('div' ,{class:'xmv-space__item',style:{
                        'padding-bottom':size + 'px',
                        'margin-right':size + 'px',
                        'min-width':fill?'100%':''
                    }} ,slot))
                })
            }
            
            return h('div' ,{class:'xmv-space' ,style:{
                'flex-wrap' : wrap?'wrap':'',
                'margin-bottom' : '-' + size + 'px',
                'align-items' : 'center'
            }},renderSlot)
        }
    }
})
</script>

<style lang="" scoped></style>
