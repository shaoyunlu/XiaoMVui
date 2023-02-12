<template>
    <slot name="content"></slot>
    <slot></slot>
</template>

<script>
import {defineComponent, onMounted ,h ,render ,createVNode ,onUnmounted} from 'vue'
import {addClass ,getPagePosition} from 'utils/dom'
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
    },
    setup(props ,{slots ,attrs}) {
        const transition = new XmvTransition()
        var pEl = document.getElementById('el-popper-container')
        var el
        var popperEl
        var defaultSlot
        var contentSlot

        const createPopperEl = ()=>{
            if (popperEl)
                return false
            popperEl = document.createElement('div')
            addClass(popperEl ,'xmv-popper is-dark')
            popperEl.innerHTML = props.content
            let {left ,top} = getPagePosition(el ,props.placement)
            let cssText = `z-index:2002;width:${props.width};position:absolute;opacity:0;
                            left:0px;top:0px;margin:0;right:auto;bottom:auto;transform: translate(${left}px,${top}px)`
            popperEl.style.cssText = cssText
        }

        const handleMouseover = ()=>{
            if (popperEl.parentNode === pEl){
                return false
            }
            pEl.appendChild(popperEl)
            transition.start('opacityIn' ,popperEl ,()=>{})
        }

        const handleMouseleave = ()=>{
            transition.start('opacityOut' ,popperEl ,()=>{
                pEl.removeChild(popperEl)
            })
        }

        onMounted(()=>{
            el = defaultSlot[0].el
            createPopperEl()

            el.addEventListener('mouseover' ,()=>{
                handleMouseover()
            })
            el.addEventListener('mouseleave' ,()=>{
                handleMouseleave()
            })

            // contentSlot = ( slots.content) == null ? void 0 : slots.content.call(slots, attrs)
            // render(contentSlot[0], document.body);

        })

        onUnmounted(()=>{
            if (popperEl){
                popperEl.remove()
                popperEl = null
            }
        })

        return ()=>{
            defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots, attrs)
            return defaultSlot
        }
    }
})
</script>

<style lang="less">

</style>