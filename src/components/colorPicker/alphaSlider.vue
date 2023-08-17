<template>
    <div class="xmv-color-alpha-slider" ref="sliderRef">
        <div class="xmv-color-alpha-slider__bar" :style="computeBarStyle"></div>
        <div class="xmv-color-alpha-slider__thumb" :style="computeThumbStyle"></div>
    </div>
</template>

<script>
import {computed, defineComponent ,ref ,inject} from 'vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const {$on ,$emit} = inject('EventBus')

        const thumbLeft = ref(1)
        const barBg = ref('')

        $on('colorVal' ,(val)=>{
            barBg.value = val
        })

        function rgbaToRgb(rgba) {
            const rgbaArray = rgba.match(/\d+(\.\d+)?/g);
            if (rgbaArray && rgbaArray.length === 4) {
                const [r, g, b] = rgbaArray;
                return `rgb(${r}, ${g}, ${b})`;
            } else {
                return null;
            }
        }

        const computeBarStyle = computed(()=>{
            let res = {}
            let bgValue = barBg.value
            if (bgValue.indexOf('rgba') >= 0){
                bgValue = rgbaToRgb(bgValue)
            }
            if (!isEmpty(bgValue)){
                let tmp = bgValue.split(")")
                let start = tmp[0].replace('rgb' ,'rgba') + ',0)'
                res['background'] = `linear-gradient(to right, ${start} 0%, ${bgValue} 100%)`
            }
            return res
        })

        const computeThumbStyle = computed(()=>{
            let res = {left : thumbLeft.value * 100 + "%"}
            return res
        })
        return {computeBarStyle ,computeThumbStyle ,thumbLeft}
    }
})
</script>

<style lang="" scoped></style>
