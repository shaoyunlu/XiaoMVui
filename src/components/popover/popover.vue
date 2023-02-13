<template>
    <slot name="content"></slot>
    <slot></slot>
</template>

<script>
import {defineComponent, onMounted ,render} from 'vue'
import {addClass ,getPagePosition} from 'utils/dom'
import XmvTransition from 'comps/transition/transition'
export default defineComponent({
    name:"xmvPopover",
    props:{
        trigger :{
            type : String,
            default : 'click'
        },
        placement : {
            type : String,
            default : 'top'
        },
    },
    setup(props ,{slots ,attrs}) {
        const transition = new XmvTransition()
        var pEl = document.getElementById('el-popper-container')
        var triggerEl
        var popperEl
        var defaultSlot
        var contentSlot

        const createPopperEl = ()=>{
            if (popperEl)
                return false
            popperEl = document.createElement('div')
            addClass(popperEl ,'xmv-popper is-light')
            let {left ,top} = getPagePosition(triggerEl ,props.placement)
            let cssText = `z-index:2080;position:absolute;display:none;
                            left:${left}px;top:${top}px;margin:0;right:auto;bottom:auto;`
            popperEl.style.cssText = cssText
        }

        onMounted(()=>{
            triggerEl = defaultSlot[0].el
            createPopperEl()
            contentSlot = ( slots.content) == null ? void 0 : slots.content.call(slots, attrs)
            render(contentSlot[0], popperEl)
            pEl.appendChild(popperEl)
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