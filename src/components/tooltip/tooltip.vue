<template>
    <span ref="placeSpan" class="xmv-place-span"></span>
    <slot></slot>
</template>

<script>
import {defineComponent, onMounted  ,onUnmounted, ref} from 'vue'
import {addClass ,getPagePosition ,getAlignPosition} from 'utils/dom'
import XmvTransition from 'comps/transition/transition'

export default defineComponent({
    name:"xmvTooltip",
    props:{
        content : String,
        placement : {
            type : String,
            default : 'top'
        },
        width : {
            type : String,
            default : 'auto'
        },
        isAlignCenter : {
            type : Boolean,
            default : false 
        }
    },
    setup(props ,{slots ,attrs}) {
        const placeSpan = ref(null)
        const transition = new XmvTransition()
        var pEl = document.getElementById('el-popper-container')
        var triggerEl
        var popperEl
        var defaultSlot

        const createPopperEl = ()=>{
            if (popperEl)
                return false
            popperEl = document.createElement('div')
            popperEl.innerHTML = props.content

            addClass(popperEl ,'xmv-popper is-dark')
            
            let cssText = `z-index:2002;width:${props.width};position:absolute;opacity:0;
                            left:0px;top:0px;margin:0;right:auto;bottom:auto;transform: translate(0px,0px)`
            popperEl.style.cssText = cssText
        }

        const setPosition = ()=>{
            let offsetLeft = 0
            let offsetTop = 0
            let {placement} = props
            let {left ,top} = getPagePosition(triggerEl ,props.placement ,popperEl)
            if (props.isAlignCenter){
                let alignInfo = getAlignPosition(triggerEl ,popperEl)
                offsetLeft = alignInfo.offsetLeft
                offsetTop = alignInfo.offsetTop
            }
            if (placement == 'top' || placement == 'bottom'){
                left += offsetLeft

            }else{
                top += offsetTop
            }
            popperEl.style.transform = `translate(${left}px,${top}px)`
        }

        const handleMouseover = ()=>{
            transition.opacityIn(()=>{
                pEl.appendChild(popperEl)
                setPosition()
            })
        }
        

        const handleMouseleave = ()=>{
            transition.opacityOut(()=>{
                pEl.removeChild(popperEl)
            })
        }

        onMounted(()=>{
            //triggerEl = defaultSlot[0].el
            triggerEl = placeSpan.value.nextElementSibling
            placeSpan.value.remove()
            createPopperEl()
            transition.setEl(popperEl)

            triggerEl.addEventListener('mouseover' ,()=>{
                handleMouseover()
            })
            triggerEl.addEventListener('mouseleave' ,()=>{
                handleMouseleave()
            })

            popperEl.addEventListener('mouseover' ,()=>{
                handleMouseover()
            })

            popperEl.addEventListener('mouseleave' ,()=>{
                handleMouseleave()
            })
        })

        onUnmounted(()=>{
            if (popperEl){
                popperEl.remove()
                popperEl = null
            }
        })

        return {placeSpan}

        // return ()=>{
        //     defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots, attrs)
        //     return defaultSlot
        // }
    }
})
</script>

<style lang="less">

</style>