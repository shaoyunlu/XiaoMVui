<template>
    <ul class="xmv-dropdown-menu" :class="computeClass">
        <slot></slot>
    </ul>
</template>

<script>
import {computed, defineComponent, inject} from 'vue'
export default defineComponent({
    name:"xmvDropdownMenu",
    setup(props ,context) {
        const size = inject('Size')

        const computeClass = computed(()=>{
            let res = []
            if (size != undefined){
                res.push('xmv-dropdown-menu--' + size)
            }
            return res
        })
        return {computeClass}
    }
})
</script>

<style lang="" scoped></style>
