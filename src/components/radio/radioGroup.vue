<template>
    <div class="xmv-radio-group">
        <slot></slot>
    </div>
</template>

<script>
import {defineComponent, provide ,reactive} from 'vue'
import {createEventBus} from 'utils/event'
import {generateId} from 'utils/data'
export default defineComponent({
    name:"xmvRadioGroup",
    props:{
        size : String,
        disabled : String
    },
    setup(props ,context) {
        
        const eventBus = reactive({
            listeners : {}
        })

        const id = generateId()

        const {$on ,$emit} = createEventBus(eventBus)

        provide('EventBus' ,{$on ,$emit})
        provide('Name' ,'xmv-' + id)

        return {}
    }
})
</script>

<style lang="" scoped></style>
