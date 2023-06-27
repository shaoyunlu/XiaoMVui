<template>
    <div class="xmv-carousel xmv-carousel--horizontal">
        <div class="xmv-carousel__container" ref="containerRef">
            <button type="button" class="xmv-carousel__arrow xmv-carousel__arrow--left" @click="handleLeft">
                <xmv-icon name="arrowLeft"></xmv-icon>
            </button>
            <button type="button" class="xmv-carousel__arrow xmv-carousel__arrow--right" @click="handleRight">
                <xmv-icon name="arrowRight"></xmv-icon>
            </button>
            <slot></slot>
        </div>
        <ul class="xmv-carousel__indicators xmv-carousel__indicators--horizontal"></ul>
    </div>
</template>

<script>
import {defineComponent, nextTick, onMounted, provide, ref} from 'vue'
import CarouselMode from './mode/carouselMode';
export default defineComponent({
    name:"xmvCarousel",
    setup(props ,context) {

        const containerRef = ref(null)
        const carouselMode = new CarouselMode({
            wrapperRef : containerRef
        })

        provide('CarouselMode' ,carouselMode)

        const handleLeft = ()=>{
            carouselMode.left()
        }

        const handleRight = ()=>{
            carouselMode.right()
        }

        onMounted(()=>{
            carouselMode.reset()
            carouselMode.animate()
        })

        return {containerRef ,handleLeft ,handleRight}
    }
})
</script>

<style lang="" scoped></style>
