<template>
    <xmv-time-scroll :list="list"></xmv-time-scroll>
</template>

<script>
import {defineComponent} from 'vue'
import xmvTimeScroll from './scroll.vue'
export default defineComponent({
    name:"",
    components:{xmvTimeScroll},
    setup(props ,context) {
        const list = []
        for(let i=0;i<24;i++){
            list.push(i)
        }
        return {list}
    }
})
</script>

<style lang="" scoped></style>
