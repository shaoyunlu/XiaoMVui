<template>
    <xmv-scrollbar class="xmv-time-spinner__wrapper" ref="scrollbarRef" @scroll="handleScroll">
        <ul class="xmv-time-spinner__list" ref="ulRef">
            <li v-for="tmp in list" class="xmv-time-spinner__item" 
                :val="tmp.value" @click="handleClick"
                :class="{'is-disabled' : tmp.isDisabled}">{{tmp.label}}</li>
        </ul>
    </xmv-scrollbar>
</template>

<script>
import {defineComponent ,inject,ref} from 'vue'
import {debounce} from 'utils/event'
import {addClass ,removeClass ,hasClass} from 'utils/dom'
export default defineComponent({
    name:"",
    emits:['scrollNum'],
    props:{
        list : {type:Array},
        type : String,
        pos : String
    },
    setup(props ,context) {
        const scrollbarRef = ref(null)
        const ulRef = ref(null)
        const isRange = inject('IsRange')

        const __handleScroll = (info)=>{
            let verVal = findVer(info.ver)
            scrollbarRef.value.scroll(verVal)
            setActive({num:verVal/32 ,needEmit : true})
        }

        const handleScroll = debounce(__handleScroll ,200)

        const handleClick = (e)=>{
            let val = parseInt(e.target.getAttribute('val'))
            scrollbarRef.value.scroll((val) * 32)
            setActive({num : val ,needEmit : true})
        }

        const setActive = ({num ,needEmit})=>{
            num = parseInt(num)
            let siblings = ulRef.value.querySelectorAll('li');
            siblings.forEach(sibling => {
                removeClass(sibling ,'is-active')
            })

            let elLi = ulRef.value.querySelector('[val="'+num+'"]')

            if (isRange){
                if (hasClass(elLi ,'is-disabled')){
                    // 找到符合的元素的最后一个
                    if (props.pos == 'left'){
                        let list = ulRef.value.querySelectorAll('li:not(.is-disabled)')
                        elLi = list[(list.length - 1)]
                        num = parseInt(elLi.getAttribute('val'))
                    }
                    // 找到符合的元素的第一个
                    else{
                        elLi = ulRef.value.querySelector('li:not(.is-disabled)')
                        num = parseInt(elLi.getAttribute('val'))
                    }
                }
            }

            addClass(elLi ,'is-active')
            scrollbarRef.value.scroll(num * 32)
            needEmit && context.emit('scrollNum' ,num)
        }

        const findVer = (num)=>{
            const multiple = 32
            const quotient = Math.floor(num / multiple)
            const remainder = num % multiple

            let result
            if (remainder >= multiple / 2) {
                result = (quotient + 1) * multiple
            } else {
                result = quotient * multiple
            }
            return result
        }

        return {scrollbarRef ,ulRef ,handleScroll ,handleClick ,setActive}
    }
})
</script>

<style lang="" scoped></style>
