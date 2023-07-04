<template>
    <div class="xmv-breadcrumb">
        <slot></slot>
    </div>
</template>

<script>
import {defineComponent ,provide ,reactive} from 'vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvBreadcrumb",
    emits:['route'],
    setup(props ,context) {

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        provide('EventBus' ,{$on ,$emit})

        $on('route' ,(to)=>{
            context.emit('route' ,to)
        })

        return {}
    }
})
</script>

<style lang="" scoped></style>
