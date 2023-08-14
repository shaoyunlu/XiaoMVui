<template>
    <div class="xmv-slider" :class="computeSliderClass"
        @click.stop="handleSliderClick" ref="sliderRef"
        >
        <div class="xmv-slider__runway">
            <div class="xmv-slider__bar"></div>
            <div class="xmv-slider__button-wrapper" 
                :style="{left : sliderVal + '%'}"
                @mousedown.stop="handleSliderMousedown">
                <xmv-tooltip :content="toolTipContent" :isAlignCenter="true" ref="tooltipRef">
                    <div class="xmv-slider__button"></div>
                </xmv-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent,onMounted,ref, watch} from 'vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvSlider",
    props:{
        modelValue : Number,
        formatTooltip : Function
    },
    setup(props ,context) {

        const sliderVal = ref(0)
        const toolTipContent = ref(0)
        const sliderRef = ref(null)
        const isDragging = ref(false)
        const tooltipRef = ref(null)
        let sliderBound

        const computeSliderClass = computed(()=>{
            let res = []
            if (isDragging.value){
                res.push('dragging')
            }
            return res
        })

        const handleSliderClick = (e)=>{
            let offsetX = parseInt(e.clientX) - sliderBound.left
            let val = parseInt((offsetX/sliderBound.width)*100)

            if (val <= 0)
                val = 0
            if (val >= 100)
                val = 100

            context.emit('update:modelValue' ,val)
        }

        const handleSliderMousedown = ()=>{
            isDragging.value = true
            tooltipRef.value.keepShow = true
            window.addEventListener('mouseup' ,handleWindowMouseup)
            window.addEventListener('mousemove' ,handleWindowMousemove)
        }

        const handleWindowMouseup = ()=>{
            isDragging.value = false
            tooltipRef.value.keepShow = false
            tooltipRef.value.hide()
            window.removeEventListener('mouseup' ,handleWindowMouseup)
            window.removeEventListener('mousemove' ,handleWindowMousemove)
        }

        const handleWindowMousemove = (e)=>{
            let offsetX = parseInt(e.clientX) - sliderBound.left
            let val = parseInt((offsetX/sliderBound.width)*100)

            if (val <= 0)
                val = 0
            if (val >= 100)
                val = 100

            context.emit('update:modelValue' ,val)
        }

        const handleWatch = (val)=>{
            sliderVal.value = val
            toolTipContent.value = formatTooltip(val)
        }

        watch(()=>props.modelValue ,(newVal)=>{
            handleWatch(newVal)
        })

        const formatTooltip = (val)=>{
            if (props.formatTooltip != undefined){
                return props.formatTooltip(val)
            }
            return val
        }

        onMounted(()=>{
            sliderBound = sliderRef.value.getBoundingClientRect()

            if (!isEmpty(props.modelValue)){
                handleWatch(props.modelValue)
            }
        })
        
        return {sliderVal ,toolTipContent ,sliderRef , computeSliderClass, isDragging, tooltipRef,
                handleSliderClick ,handleSliderMousedown ,handleWindowMousemove}
    }
})
</script>

<style lang="" scoped></style>
