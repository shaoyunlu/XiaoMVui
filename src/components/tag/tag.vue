<template>
    <span class="xmv-tag" :class="computeTagClass" ref="tagRef">
        <span class="xmv-tag__content">
            <slot></slot>
        </span>
        <xmv-icon v-if="closable != undefined"
            name="close" class="xmv-tag__close" 
            @click.stop="handleCloseClick"></xmv-icon>
    </span>
</template>

<script>
import {computed, defineComponent,getCurrentInstance,ref} from 'vue'
export default defineComponent({
    name:"xmvTag",
    props:{
        closable : String,
        type : {
                    type : String ,
                    default : 'light'
               }
    },
    emits:['close'],
    setup(props ,context) {

        const tagRef = ref(null)

        const handleCloseClick = ()=>{
            context.emit('close')
        }

        const computeTagClass = computed(()=>{
            let res = []
            res.push('xmv-tag--' + props.type)
            return res
        })

        return {tagRef ,computeTagClass ,handleCloseClick}
    }
})
</script>

<style lang="" scoped></style>
