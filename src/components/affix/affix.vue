<template>
    <div class="xmv-affix" ref="affixRef" :style="computedAffixStyle">
        <div :class="{'xmv-affix--fixed' : isFixed}" :style="computedFixedStyle" ref="fixDivRef">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent, inject, onMounted, reactive, ref} from 'vue'
import {addStyle} from 'utils/dom'
export default defineComponent({
    name:"",
    props:{
        offset : Number,
        position : {type:String ,default:'top'},
        zIndex : {type:Number ,default:100},
        target : String
    },
    setup({offset,position,zIndex,target} ,context) {

        const affixRef = ref(null)
        const fixDivRef = ref(null)
        const isFixed = ref(false)
        const XmvEventOn = inject('Xmv-Event-On')
        const translateYRef = ref(0)

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
                if (translateYRef.value != 0){
                    res['transform'] = 'translateY('+translateYRef.value+'px)'
                }
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

            if (target != undefined){
                let targetEl = document.querySelector(target)
                let targetRect = targetEl.getBoundingClientRect()

                if (targetRect.bottom <= 0){
                    isFixed.value = false
                    translateYRef.value = 0
                    return false
                }else{
                    let tmp = rect.height + offset - targetRect.bottom
                    if (tmp > 0 ){
                        translateYRef.value = 0 - tmp
                    }else{
                        translateYRef.value = 0
                    }
                }
            }

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

        return {affixRef ,fixDivRef ,isFixed ,computedAffixStyle ,computedFixedStyle}
    }
})
</script>

<style lang="" scoped></style>
