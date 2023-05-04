<template>
    <xmv-scrollbar class="xmv-time-spinner__wrapper" ref="scrollbarRef">
        <ul class="xmv-time-spinner__list">
            <li v-for="tmp in list" class="xmv-time-spinner__item">{{tmp}}</li>
        </ul>
    </xmv-scrollbar>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name:"",
    props:{
        list : {type:Array}
    },
    setup(props ,context) {
        const scrollbarRef = ref(null)
        return {scrollbarRef}
    }
})
</script>

<style lang="" scoped></style>
