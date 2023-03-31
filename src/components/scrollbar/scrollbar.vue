<template>
    <div class="xmv-scrollbar"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave" ref="scrollbarRef">
        <div class="xmv-scrollbar__wrap xmv-scrollbar__wrap--hidden-default"
            @mousedown="handleWrapMousedown"
            @mouseup="handleWrapMouseup"
            @scroll="hanleScroll" 
            :style="{'margin-right':isFirefox?'-17px':0 ,'margin-bottom':isFirefox?'-17px':0}"
            ref="scrollbarWrapRef">
            <div class="xmv-scrollbar__view" ref="viewRef" >
                <slot></slot>
            </div>
        </div>
        <div class="xmv-scrollbar__bar is-horizontal" :style="{'opacity':isFirefox?'0':''}">
            <div class="xmv-scrollbar__thumb" ref="horThumbRef" @mousedown.stop="handleMousedown"></div>
        </div>
        <div class="xmv-scrollbar__bar is-vertical">
            <div class="xmv-scrollbar__thumb" ref="verThumRef" @mousedown.stop="handleMousedown"></div>
        </div>
    </div>
</template>

<script>
import {defineComponent ,nextTick,onMounted,ref} from 'vue'
import {getDomMartix ,setDomMartix ,removeTextSelected} from 'utils/dom'
import {isFirefox} from 'utils/dict'
export default defineComponent({
    name:"xmvScrollbar",
    setup(props ,context) {
        
        const scrollbarRef = ref(null)
        const scrollbarWrapRef = ref(null)
        const viewRef = ref(null)
        const horThumbRef = ref(null)
        const verThumRef = ref(null)
        var parentHorThumbEl
        var parentVerThumEl
        var currentMouseStatus
        var wRatio
        var hRatio
        var mousePageX = null
        var mousePageY = null
        var isScrollIng = false
        var isMousedown = false
        var isWrapMousedown = false
        var verDomMartix
        var horDomMartix
        var sWh
        var vWh
        
        const handleMouseover = ()=>{
            if (currentMouseStatus == 'mouseover'){
                return false
            }
            currentMouseStatus = 'mouseover'
            sWh = getWH(scrollbarRef.value)
            vWh = getWH(viewRef.value)

            wRatio = (sWh.w/vWh.sw).toFixed(3)
            hRatio = (sWh.h/vWh.h).toFixed(3)

            // 判断横竖滚动条，哪个需要展示
            __judgeVisible()
            __calcScrollBarWH()
        }

        const handleMouseleave = ()=>{
            if (isScrollIng && isMousedown){
                return false
            }
            if (isScrollIng && isWrapMousedown){
                return false
            }
            reset()
        }

        const handleWrapMousedown = ()=>{
            isWrapMousedown = true
        }

        const handleWrapMouseup = ()=>{
            isWrapMousedown = false
        }

        const handleMousedown = (e)=>{
            removeTextSelected()
            isScrollIng = true
            isMousedown = true
            sWh = getWH(scrollbarRef.value)
            vWh = getWH(viewRef.value)
            wRatio = (sWh.w/vWh.sw).toFixed(3)
            hRatio = (sWh.h/vWh.h).toFixed(3)
            mousePageX = e.pageX
            mousePageY = e.pageY
            verDomMartix = getDomMartix(verThumRef.value)
            horDomMartix = getDomMartix(horThumbRef.value)
            window.addEventListener('mouseup' ,handleMouseup)
            window.addEventListener('mousemove' ,handleWindowMousemove)
        }

        const handleWindowMousemove = (e)=>{
            let {pageX ,pageY} = e
            let ySubtract = pageY - mousePageY
            let xSubtract = pageX - mousePageX

            let translateY = (parseFloat(verDomMartix[5]) + parseFloat(ySubtract)).toFixed(1)
            let translateX = (parseFloat(horDomMartix[4]) + parseFloat(xSubtract)).toFixed(1)

            if (translateY < 0){
                translateY = 0
            }

            if (translateX < 0){
                translateX = 0
            }

            let scrollTopValue = translateY/hRatio
            let scrollLeftValue = translateX/wRatio

            if (scrollTopValue > (vWh.h - sWh.h) ){
                scrollTopValue = vWh.h - sWh.h
                translateY = scrollTopValue * hRatio
            }

            if (scrollLeftValue > (vWh.sw - sWh.w) ){
                scrollLeftValue = vWh.sw - sWh.w
                translateX = scrollLeftValue * wRatio
            }

            setDomMartix(verThumRef.value ,[1,0,0,1,0,translateY])
            scrollbarWrapRef.value.scrollTop = scrollTopValue

            setDomMartix(horThumbRef.value ,[1,0,0,1,translateX,0])
            scrollbarWrapRef.value.scrollLeft = scrollLeftValue
        }

        const handleMouseup = ()=>{
            isMousedown = false
            reset()
            window.removeEventListener('mouseup' ,handleMouseup)
            window.removeEventListener('mousemove' ,handleWindowMousemove)
        }

        const hanleScroll = ()=>{
            isScrollIng = true
            __conversion()
        }

        const reset = ()=>{
            currentMouseStatus = ''
            wRatio = null
            hRatio = null
            mousePageX = null
            mousePageY = null
            isScrollIng = false
            verDomMartix = null
            horDomMartix = null
            sWh = null
            vWh = null
            parentHorThumbEl.style.display = 'none'
            parentVerThumEl.style.display = 'none'
        }

        const __judgeVisible = ()=>{
            parentHorThumbEl.style.display = (vWh.sw > sWh.w ? '' : 'none')
            parentVerThumEl.style.display = (vWh.h > sWh.h ? '' : 'none')
        }

        // 计算滚动条的长度
        const __calcScrollBarWH = ()=>{
            horThumbRef.value.style.width = sWh.w * wRatio + 'px'
            verThumRef.value.style.height = sWh.h * hRatio + 'px'
        }

        // 计算滚动条与元素滚动之间的换算关系
        const __conversion = ()=>{
            let scrollTop = scrollbarWrapRef.value.scrollTop
            let scrollLeft = scrollbarWrapRef.value.scrollLeft
            verThumRef.value.style.transform = `matrix(1, 0, 0, 1, 0, ${scrollTop * hRatio})`
            horThumbRef.value.style.transform = `matrix(1, 0, 0, 1, ${scrollLeft * wRatio} ,0)`
        }

        const getWH = (el)=>{
            return {w:el.clientWidth ,h:el.clientHeight ,sw:el.scrollWidth}
        }

        onMounted(()=>{
            parentHorThumbEl = horThumbRef.value.parentNode
            parentVerThumEl = verThumRef.value.parentNode

            const observer = new ResizeObserver(()=>{
                reset()
                handleMouseover()
            })

            observer.observe(viewRef.value) // 观测DOM元素

        })

        return {handleMouseover ,handleMouseleave ,hanleScroll, handleMousedown, handleWrapMousedown, handleWrapMouseup,
                scrollbarRef ,viewRef ,horThumbRef ,verThumRef ,scrollbarWrapRef ,isFirefox}
    }
})
</script>

<style lang="" scoped></style>
