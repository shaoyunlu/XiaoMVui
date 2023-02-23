<template>
    <span ref="placeSpan" class="xmv-place-span"></span>
    <slot name="trigger"></slot>
    <slot></slot>
</template>

<script>
import {defineComponent, getCurrentInstance, onMounted ,render ,ref} from 'vue'
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
        const placeSpan = ref(null)
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

            setPosition()

            transition.scaleIn(()=>{
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

            triggerEl = placeSpan.value.nextElementSibling
            defaultEl = triggerEl.nextElementSibling
            placeSpan.value.remove()

            if (props.beStripped){
                pEl = document.getElementById('el-popper-container')
            }else{
                pEl = defaultEl.parentNode
            }

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
        })

        const show = ()=>{
            handleMouseover()
        }

        const hide = ()=>{
            handleMouseleave()
        }

        return {placeSpan ,show ,hide}

        // return ()=>{
        //     defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots, attrs)
        //     return defaultSlot
        // }

        
    }
})
</script>

<style lang="less">

</style>