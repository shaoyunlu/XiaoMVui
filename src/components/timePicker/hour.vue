<template>
    <xmv-time-scroll :list="list" @scrollNum="handleNum"></xmv-time-scroll>
</template>

<script>
import {defineComponent ,inject} from 'vue'
import xmvTimeScroll from './scroll.vue'
export default defineComponent({
    name:"",
    components:{xmvTimeScroll},
    setup(props ,context) {
        const list = []
        for(let i=0;i<24;i++){
            list.push(i)
        }

        const hourRef = inject('Hour')

        const handleNum = (num)=>{
            hourRef.value = num
        }

        return {list ,handleNum}
    }
})
</script>

<style lang="" scoped></style>
