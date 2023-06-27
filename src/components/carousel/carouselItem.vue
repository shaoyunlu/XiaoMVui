<template>
    <div class="xmv-carousel__item" ref="itemRef">
        <slot></slot>
    </div>
</template>

<script>
import {defineComponent, inject, ref ,getCurrentInstance} from 'vue'
export default defineComponent({
    name:"xmvCarouselItem",
    setup(props ,context) {

        const itemRef = ref(null)
        const instance = getCurrentInstance()
        const carouselMode = inject('CarouselMode')

        carouselMode.rctData.itemList.push(instance)

        return {itemRef ,carouselMode}
    }
})
</script>

<style lang="" scoped></style>
