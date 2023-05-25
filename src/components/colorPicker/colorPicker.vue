<template>
    <xmv-popover>
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
    <div style="width:310px;padding:10px 10px 0 0">
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

        </div>
    </div>
</template>

<script>
import {computed, defineComponent ,ref} from 'vue'
export default defineComponent({
    name:"xmvColorPicker",
    setup(props ,context) {

        const sliderTop = ref(0)
        const sliderRGB = ref('rgb(255,0,0)')
        const selectedRGB = ref('rgb(255,255,255)')
        const cursorX = ref(0)
        const cursorY = ref(0)
        let mousePageX
        let mousePageY
        let currentCursorX = 0
        let currentCursorY = 0
        let currentSliderTop
        let sliderRate = 8.6932

        const handleSliderMousedown = (e)=>{
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
            calcMouseRGB(currentCursorX/280 ,currentCursorY/180)
        }

        const handleSliderMouseup = (e)=>{
            e.stopPropagation()
            window.removeEventListener('mouseup' ,handleSliderMouseup)
            window.removeEventListener('mousemove' ,handleSliderMousemove)
        }

        const handleCursorMousedown = (e)=>{
            mousePageX = e.pageX
            mousePageY = e.pageY

            currentCursorX = cursorX.value
            currentCursorY = cursorY.value

            window.addEventListener('mouseup' ,handleCursorMouseup)
            window.addEventListener('mousemove' ,handleCursorMousemove)
        }

        const handleCursorMousemove = (e)=>{
            let {pageX ,pageY} = e

            let xSubtract = pageX - mousePageX
            let ySubtract = pageY - mousePageY

            cursorX.value = currentCursorX + xSubtract
            cursorY.value = currentCursorY + ySubtract

            calcMouseRGB(cursorX.value/280 ,cursorY.value/180)
        }

        const handleCursorMouseup = (e)=>{
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
        }

        return {sliderRGB ,selectedRGB ,sliderTop ,cursorX ,cursorY ,
            handleSliderMousedown,handleCursorMousedown}
    }
})
</script>

<style lang="" scoped></style>
