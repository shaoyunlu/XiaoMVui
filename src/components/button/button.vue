<template>
    <button class="xmv-button" type="button" @click.stop="handleClick">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name:"xmvButton",
    emits:['click'],
    setup(props ,context) {

        const handleClick = ()=>{
            context.emit('click')
        }

        return {
            handleClick
        }
    }
})
</script>

<style scoped lang="less">

</style>