<template>
    <div class="xmv-image">
        <img class="xmv-image__inner" :src="src" :style="computeImgStyle">
    </div>
</template>

<script>
import {computed, defineComponent} from 'vue'
export default defineComponent({
    name:"xmvImage",
    props:{
        src : String,
        fit : {type:String ,default:'none'} //'fill', 'contain', 'cover', 'none', 'scale-down'
    },
    setup({fit} ,context) {

        const computeImgStyle = computed(()=>{
            let res = new Object()

            if (fit != undefined){
                res['object-fit'] = fit
            }

            return res
        })

        return {computeImgStyle}
    }
})
</script>

<style lang="" scoped></style>
