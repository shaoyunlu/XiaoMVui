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
        for(let i=0;i<24;i++){
            list.push(i)
        }

        const hourRef = inject('Hour')

        const handleNum = (num)=>{
            hourRef.value = num
            context.emit('val' ,num)
        }

        const setVal = (val)=>{
            hourRef.value = val
            scrollRef.value.setActive(val)
        }

        return {list ,handleNum ,setVal ,scrollRef}
    }
})
</script>

<style lang="" scoped></style>
