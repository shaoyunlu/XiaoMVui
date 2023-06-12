<template>

</template>

<script>
import {defineComponent, h, inject, watch} from 'vue'
export default defineComponent({
    name:"xmvTableTd",
    props:{
        header : Object,
        data : Object
    },
    setup(props ,context) {
        let data = props.data
        const slots = props.header.slots || {}

        const render = ()=>{

            let renderSlot = []

            let defaultSlot = slots.default ? slots.default({ data }) : null;

            if (defaultSlot)
            {
                if (defaultSlot && defaultSlot.length > 0)
                {
                    defaultSlot.forEach((__slot) => {
                        renderSlot.push(h(__slot));
                    });

                    return h('td', { class: 'xmv-table__cell' }, [
                        h('div', { class: 'cell' }, renderSlot)
                    ]);
                }
            }
            else
            {
                return h('td', { class: 'xmv-table__cell' }, [
                            h('div', { class: 'cell' } ,props.data[props.header.prop])
                        ]);
            }
        }

        return ()=>{
            return render()
        }
    }
})
</script>

<style lang="" scoped></style>
