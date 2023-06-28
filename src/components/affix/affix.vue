<template>
    <div class="xmv-affix" ref="affixRef" :style="computedAffixStyle">
        <div :class="{'xmv-affix--fixed' : isFixed}" :style="computedFixedStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent, inject, onMounted, reactive, ref} from 'vue'
export default defineComponent({
    name:"",
    props:{
        offset : Number
    },
    setup({offset} ,context) {

        const affixRef = ref(null)
        const isFixed = ref(false)
        const XmvEventOn = inject('Xmv-Event-On')

        const computedAffixStyle = computed(()=>{
            let res = {}
            if (isFixed.value){
                res.width = oriWidth + 'px'
                res.height = oriHeight + 'px'
            }
            return res
        })

        const computedFixedStyle = computed(()=>{
            let res = {}
            if (isFixed.value){
                res.width = oriWidth + 'px'
                res.height = oriHeight + 'px'
                res.top = offset + 'px'
                res.index = '100'
            }
            return res
        })

        let oriWidth
        let oriHeight

        XmvEventOn('scroll' ,(e)=>{
            let rect = affixRef.value.getBoundingClientRect();
            let distanceFromTop = rect.top;

            isFixed.value = (distanceFromTop < offset)
            
        })

        onMounted(()=>{
            oriWidth = affixRef.value.clientWidth
            oriHeight = affixRef.value.clientHeight
        })

        return {affixRef ,isFixed ,computedAffixStyle ,computedFixedStyle}
    }
})
</script>

<style lang="" scoped></style>
