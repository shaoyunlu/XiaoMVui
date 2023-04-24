<template>
    <span ref="placeSpan" class="xmv-place-span"></span>
    <slot name="trigger"></slot>
    <slot></slot>
</template>

<script>
import {defineComponent,  inject,  onMounted ,ref} from 'vue'
import {addClass ,getPagePosition} from 'utils/dom'
import XmvTransition from 'comps/transition/transition'
export default defineComponent({
    name:"xmvPopover",
    emits:['mouseover' ,'mouseleave' ,'mouseclick' ,'show' ,'hide'],
    props:{
        trigger :{
            type : String,
            default : 'click'
        },
        placement : {
            type : String,
            default : 'bottom'
        },
        beStripped : {type : Boolean ,default : true},
    },
    setup(props ,{slots ,attrs ,emit}) {
        const enableRef = ref(true)
        const placeSpan = ref(null)
        const transition = new XmvTransition({})
        var pEl = inject('Xmv-Dom-PopperContainer')
        var triggerEl
        var popperEl
        var defaultEl
        var currentEventName
        const isShow = ref(false)

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
            let {left ,top ,type} = getPagePosition(triggerEl ,props.placement ,popperEl)
            transition.placement = type

            if (pEl.parentNode.tagName != 'BODY'){
                left = triggerEl.offsetWidth + 5
                top = triggerEl.offsetTop - 1
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
            emit('mouseover')
            emit('show')
        }

        const handleMouseleave = (cbf)=>{
            currentEventName = 'mouseleave'
            transition.scaleOut(()=>{
                popperEl.style.display = 'none'
            })
            emit('mouseleave')
            emit('hide')
        }

        const handleMouseclick = ()=>{
            if (!enableRef.value){
                return false
            }
            if (isShow.value){
                isShow.value = false
                handleMouseleave()
            }else{
                isShow.value = true
                handleMouseover()
            }
        }

        const XmvEventOn = inject('Xmv-Event-On')

        XmvEventOn('mouseup' ,(e)=>{
            if (isShow.value){
                hide()
            }
        })

        onMounted(()=>{
            triggerEl = placeSpan.value.nextElementSibling
            defaultEl = triggerEl.nextElementSibling
            placeSpan.value.remove()

            if (!props.beStripped){
                pEl = defaultEl.parentNode
            }

            createPopperEl()
            popperEl.appendChild(defaultEl)
            pEl.appendChild(popperEl)

            transition.setEl(popperEl)

            if (props.trigger == 'click'){
                triggerEl.addEventListener('click' ,()=>{
                    handleMouseclick()
                })
            }else{
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
            }
        })

        const show = ()=>{
            isShow.value = true
            handleMouseover()
        }

        const hide = ()=>{
            isShow.value = false
            handleMouseleave()
        }

        const enable = ()=>{
            enableRef.value = true
        }

        const disabled = ()=>{
            enableRef.value = false
        }

        return {enableRef ,placeSpan ,isShow ,show ,hide ,enable ,disabled ,setPosition}

        // return ()=>{
        //     defaultSlot = ( slots.default) == null ? void 0 : slots.default.call(slots, attrs)
        //     return defaultSlot
        // }
    }
})
</script>

<style lang="less">

</style>