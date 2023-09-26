<template>
    <div class="xmv-tabs__item" :class="computeClass" @click="handleClick" ref="itemRef">
        {{data.label}}
    </div>
</template>

<script>
import {computed, defineComponent ,inject, onMounted ,ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        data : Object,
        index : Number
    },
    setup({data ,index} ,context) {
        const itemRef = ref(null)
        const tabsMode = inject('TabsMode')
        const computeClass = computed(()=>{
            let res = []
            res.push('is-' + tabsMode.tabPosition)
            if (data.isActive){
                res.push('is-active')
            }
            return res
        })

        tabsMode.$on('itemClick' ,(name)=>{
            data.isActive = (name == data.name)
            if (data.isActive){
                tabsMode.barWidth.value = itemRef.value.clientWidth - 20
                tabsMode.barTranslate.value = itemRef.value.offsetLeft == 0 ? 0 : itemRef.value.offsetLeft + 20
            }
        })

        const handleClick = ()=>{
            data.isActive = true
            tabsMode.$emit('itemClick' ,data.name)
        }

        return {computeClass ,handleClick ,itemRef}
    }
})
</script>

<style lang="" scoped></style>
