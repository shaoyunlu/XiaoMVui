<template>
    <div class="xmv-radio-group">
        <slot></slot>
    </div>
</template>

<script>
import {defineComponent, provide ,reactive} from 'vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvRadioGroup",
    props:{
        model : String
    },
    setup(props ,context) {
        
        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        provide('EventBus' ,{$on ,$emit})
        provide('GroupProps' ,props)

        return {}
    }
})
</script>

<style lang="" scoped></style>
