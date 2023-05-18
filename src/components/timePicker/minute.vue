<template>
    <xmv-time-scroll :list="list" @scrollNum="handleNum" ref="scrollRef"></xmv-time-scroll>
</template>

<script>
import {defineComponent ,inject ,ref} from 'vue'
import xmvTimeScroll from './scroll.vue'
export default defineComponent({
    name:"",
    components:{xmvTimeScroll},
    setup(props ,context) {

        const scrollRef = ref(null)

        const list = []
        for(let i=0;i<60;i++){
            list.push(i)
        }

        const minuteRef = inject('Minute')

        const handleNum = (num)=>{
            minuteRef.value = num
            context.emit('val' ,num)
        }

        const setVal = (val)=>{
            minuteRef.value = val
            scrollRef.value.setActive(val)
        }

        return {list ,handleNum ,scrollRef ,setVal}
    }
})
</script>

<style lang="" scoped></style>
