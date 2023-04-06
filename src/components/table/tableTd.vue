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
            let defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots)
            if (defaultSlot){

                return h('td', { class: 'xmv-table__cell' }, [
                            h('div', { class: 'cell' } ,[h(defaultSlot[0].children[0] ,{onClick : handleClick})])
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
