<template>
    <div class="xmv-card" :class="computeCardClass">
        <div class="xmv-card__header">
            <slot name="header"></slot>
        </div>
        <div class="xmv-card__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {computed, defineComponent} from 'vue'
export default defineComponent({
    name:"",
    props:{
        shadow : {type:String ,default:'always'}
    },
    setup(props ,context) {

        const computeCardClass = computed(()=>{
            return ['is-' + props.shadow + '-shadow']
        })

        return {computeCardClass}
    }
})
</script>

<style lang="" scoped></style>
