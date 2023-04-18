<template>
    <span class="xmv-tag xmv-tag--light" ref="tagRef">
        <span class="xmv-tag__content">
            <slot></slot>
        </span>
        <xmv-icon v-if="closable != undefined"
            name="close" class="xmv-tag__close" 
            @click.stop="handleCloseClick"></xmv-icon>
    </span>
</template>

<script>
import {defineComponent,getCurrentInstance,ref} from 'vue'
export default defineComponent({
    name:"xmvTag",
    props:{
        closable : String
    },
    emits:['close'],
    setup(props ,context) {

        const tagRef = ref(null)

        const handleCloseClick = ()=>{
            context.emit('close')
        }

        return {tagRef ,handleCloseClick}
    }
})
</script>

<style lang="" scoped></style>
