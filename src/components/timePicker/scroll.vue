<template>
    <xmv-scrollbar class="xmv-time-spinner__wrapper" ref="scrollbarRef" @scroll="handleScroll">
        <ul class="xmv-time-spinner__list" ref="ulRef">
            <li v-for="tmp in list" class="xmv-time-spinner__item" :val="tmp" @click="handleClick">{{tmp}}</li>
        </ul>
    </xmv-scrollbar>
</template>

<script>
import {defineComponent ,ref} from 'vue'
import {debounce} from 'utils/event'
import {addClass ,removeClass} from 'utils/dom'
export default defineComponent({
    name:"",
    emits:['scrollNum'],
    props:{
        list : {type:Array}
    },
    setup(props ,context) {
        const scrollbarRef = ref(null)
        const ulRef = ref(null)

        const __handleScroll = (info)=>{
            let verVal = findVer(info.ver)
            scrollbarRef.value.scroll(verVal)
            setActive(verVal/32)
            context.emit('scrollNum' ,verVal/32)
        }

        const handleScroll = debounce(__handleScroll ,200)

        const handleClick = (e)=>{
            let val = parseInt(e.target.getAttribute('val'))
            scrollbarRef.value.scroll((val) * 32)
            setActive(val)
        }

        const setActive = (num)=>{

            let siblings = ulRef.value.querySelectorAll('li');

            siblings.forEach(sibling => {
                removeClass(sibling ,'is-active')
            })

            let elLi = ulRef.value.querySelector('[val="'+num+'"]')
            addClass(elLi ,'is-active')
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

        return {scrollbarRef ,ulRef ,handleScroll ,handleClick}
    }
})
</script>

<style lang="" scoped></style>
