<template>
    <div class="xmv-notification right" :class="computeNotificationClass"></div>
</template>

<script>
import {computed, defineComponent} from 'vue'
export default defineComponent({
    name:"xmvNotification",
    props:{
        position : {type : String, default : 'top-right'},
        type : {type : String ,default : ''}
    },
    setup(props ,context) {

        const computeNotificationClass = computed(()=>{
            let res = []
            let position = props.position
            if (position == 'top-right' || position == 'bottom-right'){
                res.push('right')
            }else{
                res.push('left')
            }
            return res
        })

        return {computeNotificationClass}
    }
})
</script>

<style lang="" scoped></style>
