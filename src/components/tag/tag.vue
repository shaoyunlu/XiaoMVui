<template>
    <span class="xmv-tag xmv-tag--light" ref="tagRef">
        <span class="xmv-tag__content">
            <slot></slot>
        </span>
        <xmv-icon name="close" class="xmv-tag__close" @click="handleCloseClick"></xmv-icon>
    </span>
</template>

<script>
import {defineComponent ,ref} from 'vue'
export default defineComponent({
    name:"xmvTag",
    setup(props ,context) {

        const tagRef = ref(null)

        const handleCloseClick = ()=>{
            context.emit('close')
            tagRef.value.remove()
        }

        return {tagRef ,handleCloseClick}
    }
})
</script>

<style lang="" scoped></style>
