<template>
    <div class="xmv-slider" :class="computeSliderClass">
        <div class="xmv-slider__runway" @click.stop="handleSliderClick" ref="sliderRef">
            <div class="xmv-slider__bar"></div>
            <div class="xmv-slider__button-wrapper" 
                :style="{left : sliderVal + '%'}"
                >
                <xmv-tooltip :content="toolTipContent" :isAlignCenter="true" ref="tooltipRef">
                    <div class="xmv-slider__button" @mousedown.stop="handleSliderButtonMousedown"></div>
                </xmv-tooltip>
            </div>
            <div v-if="showStep != undefined">
                <div v-for="tmp in stepList" class="xmv-slider__stop" :style="{left:tmp + '%'}"></div>
            </div>
        </div>
        <xmv-input-number class="xmv-slider__input" 
            v-model="sliderVal" :step="step" :size="size" :min="0" :max="100"
            @inputChange="handleInputChange"></xmv-input-number>
    </div>
</template>

<script>
import {computed, defineComponent,onMounted,ref, watch} from 'vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvSlider",
    props:{
        modelValue : Number,
        formatTooltip : Function,
        step : {type : Number ,default : 1},
        showStep : {type : String},
        showInput : {type : String},
        size : {type : String}
    },
    setup(props ,context) {

        const sliderVal = ref(0)
        const toolTipContent = ref(0)
        const sliderRef = ref(null)
        const isDragging = ref(false)
        const tooltipRef = ref(null)
        const stepList = ref([])

        let sliderBound

        const computeSliderClass = computed(()=>{
            let res = []
            if (isDragging.value){
                res.push('dragging')
            }
            if (props.showInput != undefined){
                res.push('xmv-slider--with-input')
            }
            if (props.size != undefined){
                res.push('xmv-slider--' + props.size)
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

        const handleSliderButtonMousedown = ()=>{
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

        const __nearestStep = (num, step)=> {
            return Math.round(num / step) * step;
        }

        const handleInputChange = (val)=>{
            context.emit('update:modelValue' ,val)
        }

        const handleWatch = (val)=>{
            let __val = __nearestStep(val ,props.step)
            sliderVal.value = __val
            toolTipContent.value = formatTooltip(__val)
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

            if (props.showStep != undefined){
                let listNum = 100 / props.step
                for(let i=1;i<listNum;i++){
                    stepList.value.push(i*props.step)
                }
            }
        })
        
        return {sliderVal ,toolTipContent ,sliderRef , computeSliderClass, isDragging, tooltipRef,
                stepList,
                handleSliderClick ,handleSliderButtonMousedown ,handleWindowMousemove ,handleInputChange}
    }
})
</script>

<style lang="" scoped></style>
