<template>
    <div class="xmv-scrollbar"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave" ref="scrollbarRef">
        <div class="xmv-scrollbar__wrap xmv-scrollbar__wrap--hidden-default"
            @mousedown="handleWrapMousedown"
            @mouseup="handleWrapMouseup"
            @scroll="hanleScroll" 
            :style="{'margin-right':isMargin?'-17px':0 ,'margin-bottom':isMargin?'-17px':0}"
            ref="scrollbarWrapRef">
            <div class="xmv-scrollbar__view" ref="viewRef" >
                <slot></slot>
            </div>
        </div>
        <div class="xmv-scrollbar__bar is-horizontal" :style="{'opacity':isPolyfill?'0':'' ,'height':isPolyfill?'0':''}">
            <div class="xmv-scrollbar__thumb" ref="horThumbRef" 
            @mousedown.stop="(event) => handleMousedown('hor', event)"></div>
        </div>
        <div class="xmv-scrollbar__bar is-vertical">
            <div class="xmv-scrollbar__thumb" ref="verThumRef" 
            @mousedown.stop="(event) => handleMousedown('ver', event)"></div>
        </div>
    </div>
</template>

<script>
import {defineComponent ,nextTick,onMounted,ref} from 'vue'
import {getDomMartix ,setDomMartix ,removeTextSelected} from 'utils/dom'
import {isFirefox ,isLowVersionFirefox} from 'utils/dict'
import {resizeOB} from 'utils/event'
export default defineComponent({
    name:"xmvScrollbar",
    emits:['scroll'],
    setup(props ,context) {
        
        const scrollbarRef = ref(null)
        const scrollbarWrapRef = ref(null)
        const viewRef = ref(null)
        const horThumbRef = ref(null)
        const verThumRef = ref(null)
        const isPolyfill = isLowVersionFirefox('64.0.0')
        const isMargin = ref(false)
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
        var currentMouseDown /* 判断横轴动还是纵轴动 */
        
        const handleMouseover = ()=>{
            if (currentMouseStatus == 'mouseover'){
                return false
            }
            if (isPolyfill){
                let res = viewRef.value.scrollHeight - scrollbarRef.value.clientHeight
                isMargin.value = (res != 17 && res != 0)
            }
            currentMouseStatus = 'mouseover'
            //let gutter = __getGutter()
            sWh = __getWH(scrollbarRef.value)
            vWh = __getWH(viewRef.value)

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

        const handleMousedown = (type ,e)=>{
            currentMouseDown = type
            removeTextSelected()
            isScrollIng = true
            isMousedown = true
            //let gutter = __getGutter()
            sWh = __getWH(scrollbarRef.value)
            vWh = __getWH(viewRef.value)
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
            e.preventDefault()
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

            if (currentMouseDown == 'ver'){
                setDomMartix(verThumRef.value ,[1,0,0,1,0,translateY])
                scrollbarWrapRef.value.scrollTop = scrollTopValue
            }else if (currentMouseDown == 'hor'){
                setDomMartix(horThumbRef.value ,[1,0,0,1,translateX,0])
                scrollbarWrapRef.value.scrollLeft = scrollLeftValue
            }
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
            context.emit('scroll' ,{'hor' : scrollbarWrapRef.value.scrollLeft})

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
            currentMouseDown = ''
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

        const __getWH = (el ,gutter = {ver:0,hor:0})=>{
            return {w:el.clientWidth ,h:el.clientHeight + gutter.ver ,sw:el.scrollWidth}
        }

        onMounted(()=>{
            parentHorThumbEl = horThumbRef.value.parentNode
            parentVerThumEl = verThumRef.value.parentNode

            resizeOB(viewRef.value ,()=>{
                reset()
                handleMouseover()
            })
        })

        return {handleMouseover ,handleMouseleave ,hanleScroll, handleMousedown, handleWrapMousedown, handleWrapMouseup,
                scrollbarRef ,viewRef ,horThumbRef ,verThumRef ,scrollbarWrapRef ,isPolyfill ,isMargin}
    }
})
</script>

<style lang="" scoped></style>
