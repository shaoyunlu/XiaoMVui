<template>
    <label class="xmv-radio-button">
        <input type="radio" class="xmv-radio-button__original-radio" :value="label" :name="groupProps.model">
        <span class="xmv-radio-button__inner">
            <slot></slot>
        </span>
    </label>
</template>

<script>
import {defineComponent ,inject} from 'vue'
export default defineComponent({
    name:"xmvRadioButton",
    props:{
        label : String,
        size : String,
        disabled : String
    },
    setup(props ,context) {

        const {$on ,$emit} = inject('EventBus')
        const groupProps = inject('GroupProps')

        return {groupProps}
    }
})
</script>

<style lang="" scoped></style>
