<template>

</template>

<script>
import {defineComponent, h, inject} from 'vue'
export default defineComponent({
    name:"xmvTableTd",
    props:{
        header : Object,
        data : Object
    },
    setup(props ,context) {
        const tableMode = inject('TableMode')
        const slots = props.header.slots || {}
        const handleClick = ()=>{
            alert(1)
        }

        return ()=>{
            let renderSlot = []
            let defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots)
            if (defaultSlot){
                defaultSlot[0].children.forEach((__slot)=>{
                    renderSlot.push(h(__slot ,{onClick : handleClick}))
                })
                return h('td', { class: 'xmv-table__cell' }, [
                            h('div', { class: 'cell' } ,
                                renderSlot
                            )
                        ]);
            }else{
                return h('td', { class: 'xmv-table__cell' }, [
                            h('div', { class: 'cell' } ,props.data[props.header.prop])
                        ]);
            }
        }
    }
})
</script>

<style lang="" scoped></style>
