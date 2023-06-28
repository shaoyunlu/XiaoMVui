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
        offset : Number,
        position : {type:String ,default:'top'},
        zIndex : {type:Number ,default:100}
    },
    setup({offset,position,zIndex} ,context) {

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
                res[position] = offset + 'px'
                res['z-index'] = zIndex
            }
            return res
        })

        let oriWidth
        let oriHeight

        XmvEventOn('scroll' ,(e)=>{
            setFix()
        })

        const setFix = ()=>{
            let rect = affixRef.value.getBoundingClientRect();
            if (position == 'top'){
                let distanceFromTop = rect.top;
                isFixed.value = (distanceFromTop < offset)
            }else{
                let documentHeight = document.documentElement.clientHeight
                let distanceFromBottom = rect.bottom

                isFixed.value = ((documentHeight-distanceFromBottom) < offset)
            }
        }

        onMounted(()=>{
            oriWidth = affixRef.value.clientWidth
            oriHeight = affixRef.value.clientHeight
            setFix()
        })

        return {affixRef ,isFixed ,computedAffixStyle ,computedFixedStyle}
    }
})
</script>

<style lang="" scoped></style>
