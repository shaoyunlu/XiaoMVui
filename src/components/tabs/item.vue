<template>
    <div :class="computeClass" @click="handleClick" ref="itemRef">
        {{data.label}}
    </div>
</template>

<script>
import {computed, defineComponent ,inject, h ,ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        data : Object,
        index : Number
    },
    setup(props ,context) {
        const itemRef = ref(null)
        const tabsMode = inject('TabsMode')
        const computeClass = computed(()=>{
            let res = ['xmv-tabs__item']
            res.push('is-' + tabsMode.tabPosition)
            if (props.data.isActive){
                res.push('is-active')
            }
            return res
        })

        tabsMode.$on('itemClick' ,(name)=>{
            props.data.isActive = (name == props.data.name)
            if (props.data.isActive){
                if (tabsMode.tabPosition == 'top' || tabsMode.tabPosition == 'bottom'){
                    tabsMode.barWidth.value = itemRef.value.clientWidth - 20
                    tabsMode.barTranslateX.value = itemRef.value.offsetLeft == 0 ? 0 : itemRef.value.offsetLeft + 20
                }else{
                    tabsMode.barHeight.value = itemRef.value.clientHeight
                    tabsMode.barTranslateY.value = itemRef.value.offsetTop
                }
            }
        })

        const handleClick = ()=>{
            props.data.isActive = true
            tabsMode.$emit('itemClick' ,props.data.name)
        }

        return ()=>{
            console.log(props.data.slots.label)
            return h('div' ,{
                'class':computeClass.value,
                'onClick':handleClick,
                'ref':itemRef
            } ,props.data.slots.label?h(props.data.slots.label):props.data.label)
        }

        //return {computeClass ,handleClick ,itemRef}
    }
})
</script>

<style lang="" scoped></style>
