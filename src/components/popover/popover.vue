<template>
    <slot name="trigger"></slot>
    <slot></slot>
</template>

<script>
import {defineComponent, getCurrentInstance, onMounted ,render ,watch} from 'vue'
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
            default : 'right'
        },
        needUpdate : false,
        beStripped : true
    },
    setup(props ,{slots ,attrs}) {
        const transition = new XmvTransition()
        var pEl = document.getElementById('el-popper-container')
        var triggerEl
        var popperEl
        var defaultSlot
        var defaultEl
        var triggerSlot
        var currentEventName
        
        const instance = getCurrentInstance()

        const createPopperEl = ()=>{
            if (popperEl)
                return false
            popperEl = document.createElement('div')

            addClass(popperEl ,'xmv-popper is-light is-pure')

            let cssText = `z-index:2080;position:absolute;display:none;
                            left:0px;top:0px;margin:0;right:auto;bottom:auto;`
            popperEl.style.cssText = cssText
        }

        const setPosition = ()=>{
            let {left ,top} = getPagePosition(triggerEl ,props.placement ,popperEl)

            if (pEl.id != 'el-popper-container'){
                left = triggerEl.offsetWidth + 5
                top = triggerEl.offsetTop
            }

            popperEl.style.left = left + 'px'
            popperEl.style.top = top + 'px'
        }
    
        const handleMouseover = (cbf)=>{
            if (currentEventName == 'mouseover'){
                return false
            }
            currentEventName = 'mouseover'
            if (props.needUpdate){
                let {left ,top} = getPagePosition(triggerEl ,props.placement ,popperEl)

                if (pEl.id != 'el-popper-container'){
                    left = triggerEl.offsetWidth
                    top = triggerEl.offsetTop
                }

                popperEl.style.left = left + 'px'
                popperEl.style.top = top + 'px'
            }
            
            transition.scaleIn(()=>{
                // popperEl.style.scale = 0
                popperEl.style.display = ''
            })
        }

        const handleMouseleave = (cbf)=>{
            currentEventName = 'mouseleave'
            transition.scaleOut(()=>{
                popperEl.style.display = 'none'
            })
        }

        onMounted(()=>{
            defaultEl = defaultSlot[0].el

            if (props.beStripped){
                pEl = document.getElementById('el-popper-container')
            }else{
                pEl = defaultEl.parentNode
            }

            triggerSlot = ( slots.trigger) == null ? void 0 : slots.trigger.call(slots, attrs)
            render(triggerSlot[0], defaultEl.parentNode)
            triggerEl = triggerSlot[0].el

            defaultEl.parentNode.insertBefore(triggerEl ,defaultEl)

            createPopperEl()
            popperEl.appendChild(defaultEl)
            pEl.appendChild(popperEl)

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

            instance.xmvShow = ()=>{
                handleMouseover()
            }

            instance.xmvHide = ()=>{
                handleMouseleave()
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