<template>
    <xmv-popover ref="popoverRef" @hide="handlePopoverHide">
        <template #trigger>
            <div class="xmv-color-picker xmv-tooltip__trigger">
                <div class="xmv-color-picker__trigger">
                    <span class="xmv-color-picker__color">
                        <span class="xmv-color-picker__color-inner" :style="{'background-color' : selectedRGB}">
                            <xmv-icon name="arrowDown" class="xmv-color-picker__icon"></xmv-icon>
                        </span>
                    </span>
                </div>
            </div>
        </template>
    </xmv-popover>
    <div style="width:320px;padding:10px 10px 0 10px">
        <div class="xmv-color-dropdown__main-wrapper">
            <div class="xmv-color-hue-slider is-vertical hue-slider">
                <div class="xmv-color-hue-slider__bar"></div>
                <div class="xmv-color-hue-slider__thumb" 
                :style="{'left':'0px' ,'top':sliderTop + 'px'}"
                @mousedown.stop="handleSliderMousedown"></div>
            </div>
            <div class="xmv-color-svpanel" :style="{'background-color' : sliderRGB}">
                <div class="xmv-color-svpanel__white"></div>
                <div class="xmv-color-svpanel__black"></div>
                <div class="xmv-color-svpanel__cursor" 
                    :style="{'left':cursorX+'px','top':cursorY+'px'}"
                    @mousedown.stop="handleCursorMousedown">
                    <div></div>
                </div>
            </div>
        </div>
        <div class="xmv-color-dropdown__btns">
            <span class="xmv-color-dropdown__value">
                <xmv-input size="small" ref="inputRef"></xmv-input>
            </span>
            <xmv-button size="small" text @click="handleClear">清除</xmv-button>
            <xmv-button size="small" plain @click="handleEnter">确认</xmv-button>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent ,onMounted,ref, watch ,inject} from 'vue'
export default defineComponent({
    name:"xmvColorPicker",
    props:{
        modelValue : String
    },
    setup(props ,context) {
        const sliderTop = ref(0)
        const sliderRGB = ref('rgb(255,0,0)')
        const selectedRGB = ref('')
        const cursorX = ref(0)
        const cursorY = ref(0)
        const inputRef = ref(null)
        const popoverRef = ref(null)
        const svgPanelWidth = 280
        const svgPanelHeight = 180
        let mousePageX
        let mousePageY
        let currentCursorX = 0
        let currentCursorY = 0
        let currentSliderTop

        let tempCursorX = 0
        let tempCursorY = 0
        let tempSliderTop = 0
        let tempSelectedRGB = ''
        let tempSliderRGB = 'rgb(255,0,0)'
    
        let sliderRate = 8.6932

        const XmvBubbling = inject('Xmv-Bubbling')

        const handleSliderMousedown = (e)=>{
            XmvBubbling.status = false
            mousePageY = e.pageY
            currentSliderTop = sliderTop.value
            window.addEventListener('mouseup' ,handleSliderMouseup)
            window.addEventListener('mousemove' ,handleSliderMousemove)
        }

        const handleSliderMousemove = (e)=>{
            let {pageY} = e
            let ySubtract = pageY - mousePageY + currentSliderTop
            if (ySubtract <= 0){
                sliderTop.value = 0
            }else if(ySubtract >= 176){
                sliderTop.value = 176
            }else{
                sliderTop.value = ySubtract
            }

            calcSliderRGB(Math.floor(sliderTop.value * sliderRate))
            calcMouseRGB(currentCursorX/svgPanelWidth ,currentCursorY/svgPanelHeight)
        }

        const handleSliderMouseup = (e)=>{
            XmvBubbling.status = true
            window.removeEventListener('mouseup' ,handleSliderMouseup)
            window.removeEventListener('mousemove' ,handleSliderMousemove)
        }

        const handleCursorMousedown = (e)=>{
            XmvBubbling.status = false
            mousePageX = e.pageX
            mousePageY = e.pageY

            currentCursorX = cursorX.value
            currentCursorY = cursorY.value

            window.addEventListener('mouseup' ,handleCursorMouseup)
            window.addEventListener('mousemove' ,handleCursorMousemove)
        }

        const handleCursorMousemove = (e)=>{
            let {pageX ,pageY} = e

            let xSubtract = pageX - mousePageX + currentCursorX
            let ySubtract = pageY - mousePageY + currentCursorY

            if (xSubtract <= 0){
                xSubtract = 0
            }
            if (xSubtract >= svgPanelWidth){
                xSubtract = svgPanelWidth
            }

            if (ySubtract <= 0){
                ySubtract = 0
            }
            if (ySubtract >= svgPanelHeight){
                ySubtract = svgPanelHeight
            }

            cursorX.value = xSubtract
            cursorY.value = ySubtract

            calcMouseRGB(cursorX.value/svgPanelWidth ,cursorY.value/svgPanelHeight)
        }

        const handleCursorMouseup = (e)=>{
            XmvBubbling.status = true
            currentCursorX = cursorX.value
            currentCursorY = cursorY.value
            e.stopPropagation()
            window.removeEventListener('mouseup' ,handleCursorMouseup)
            window.removeEventListener('mousemove' ,handleCursorMousemove)
        }

        const calcSliderRGB = (val)=>{
            let betweenNum = Math.floor(val/255)
            let remainder = val%255

            if (betweenNum == 6){
                sliderRGB.value = 'rgb(255,0,0)' 
            }

            if (betweenNum == 0){
                sliderRGB.value = 'rgb(255 ,' + remainder + ' ,0)'
            }
            else if (betweenNum == 1){
                sliderRGB.value = `rgb(${255-remainder},255,0)`
            }
            else if (betweenNum == 2){
                sliderRGB.value = `rgb(0,255,${remainder})`
            }
            else if (betweenNum == 3){
                sliderRGB.value = `rgb(0,${255-remainder},255)`
            }
            else if (betweenNum == 4){
                sliderRGB.value = `rgb(${remainder},0,255)`
            }
            else if (betweenNum == 5){
                sliderRGB.value = `rgb(255,0,${255-remainder})`
            }

            calcMouseRGB()
        }

        const calcMouseRGB = (x ,y)=>{
            const white = [255, 255, 255];
            const spec = sliderRGB.value.slice(4, -1).split(',').map(Number);
            const black = [0, 0, 0]

            let r = (1 - y) * ((1 - x) * white[0] + x * spec[0]) + y * ((1 - x) * black[0] + x * black[0])
            let g = (1 - y) * ((1 - x) * white[1] + x * spec[1]) + y * ((1 - x) * black[1] + x * black[1])
            let b = (1 - y) * ((1 - x) * white[2] + x * spec[2]) + y * ((1 - x) * black[2] + x * black[2])

            selectedRGB.value = `rgb(${Math.floor(r)} ,${Math.floor(g)} ,${Math.floor(b)})`
            inputRef.value.val(selectedRGB.value)
        }

        const handleClear = ()=>{
            popoverRef.value.hide()
            inputRef.value.val('')
            selectedRGB.value = ''
            context.emit('update:modelValue' ,'')
        }

        const handleEnter = ()=>{
            cache()
            context.emit('update:modelValue' ,selectedRGB.value)
            popoverRef.value.hide()

        }

        const handlePopoverHide = ()=>{
            reset()
        }

        const cache = ()=>{
            tempCursorX = cursorX.value
            tempCursorY = cursorY.value
            tempSliderTop = sliderTop.value
            tempSelectedRGB = selectedRGB.value
            tempSliderRGB = sliderRGB.value
        }

        const reset = ()=>{
            cursorX.value = tempCursorX
            cursorY.value = tempCursorY
            sliderTop.value = tempSliderTop
            selectedRGB.value = tempSelectedRGB
            sliderRGB.value = tempSliderRGB
            inputRef.value.val(selectedRGB.value)
        }

        watch(()=>props.modelValue ,(newVal)=>{
            handleWatch(newVal)
        })

        const handleWatch = (newVal)=>{
            selectedRGB.value = newVal
            tempSelectedRGB = newVal
            inputRef.value.val(selectedRGB.value)
        }

        const rgbTobinary = (str)=>{
            const arr = str.slice(4, -1).split(',').map(Number);
            const hex = '#' + arr.map(c => c.toString(16).padStart(2, '0')).join('');
            return hex.toUpperCase()
        }

        const binaryToRgb = (hex)=>{
            const arr = hex.slice(1).match(/.{2}/g).map(h => parseInt(h, 16));
            const rgb = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
            return rgb
        }

        onMounted(()=>{
            if (props.modelValue != undefined){
                handleWatch(props.modelValue)
            }
        })

        return {sliderRGB ,selectedRGB ,sliderTop ,cursorX ,cursorY ,inputRef,popoverRef,
            handleSliderMousedown,handleCursorMousedown,handleClear,handleEnter ,handlePopoverHide}
    }
})
</script>

<style lang="" scoped></style>
