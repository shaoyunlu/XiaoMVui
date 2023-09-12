<template>

</template>

<script>
import {defineComponent, h, computed ,inject} from 'vue'
import xmvCheckbox from 'comps/checkbox/checkbox.vue'
import xmvTooltip from 'comps/tooltip/tooltip.vue'
export default defineComponent({
    name:"xmvTableTd",
    props:{
        header : Object,
        data : Object
    },
    components:{xmvCheckbox},
    setup(props ,context) {
        let data = props.data
        const slots = props.header.slots || {}

        const tableMode = inject('TableMode')

        const computeTdClass = computed(()=>{
            let res = []
            res.push('xmv-table__cell')
            if (props.header.fixed != undefined){
                res.push('xmv-table-fixed-column--'+(props.header.fixed == ''?'left':props.header.fixed))
            }
            return res
        })

        const handleCheck = (flag)=>{
            data.checked = flag
            tableMode.checkSingle()
        }

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

                    return h('td', { class: computeTdClass.value }, [
                        h('div', { class: 'cell' }, renderSlot)
                    ]);
                }
            }else if(props.header.type == 'checkbox'){
                return h('td', { class: computeTdClass.value }, [
                            h('div', { class: 'cell' } ,h(xmvCheckbox ,{
                                'modelValue' : data.checked,
                                'onCheck' : handleCheck
                            }))
                        ]);
            }else if(props.header.type == 'index'){
                return h('td', { class: computeTdClass.value }, [
                            h('div', { class: 'cell' } ,data.xmvIndex + 1)
                        ]);
            }
            else
            {
                if (props.header.showOverflowTooltip){
                    return h(xmvTooltip ,{'content':props.data[props.header.prop]} ,
                                h('td' ,{ class: computeTdClass.value } ,
                                h('div',{class:'cell xmv-tooltip'},props.data[props.header.prop])))
                }else{
                    return h('td', { class: computeTdClass.value }, [
                            h('div', { class: 'cell' } ,props.data[props.header.prop])
                        ]);
                }
            }
        }

        return ()=>{
            return render()
        }
    }
})
</script>

<style lang="" scoped></style>
