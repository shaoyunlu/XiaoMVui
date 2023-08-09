<template>
    <button class="xmv-button" :class="classList" type="button" @click.stop="handleClick">
        <span>
            <xmv-icon :name="icon" :class="{'xmv-icon--left':textShow}" v-if="iconPosition == 'left'"></xmv-icon>
            <slot></slot>
            <xmv-icon :name="icon" :class="{'xmv-icon--right':textShow,'is-loading':isLoading}" v-if="iconRightShow"></xmv-icon>
        </span>
    </button>
</template>

<script>
import {computed, defineComponent, watch ,ref} from 'vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvButton",
    emits:['click'],
    props:{
        type : String,
        size : String,
        icon : String,
        iconPosition : {type:String,default:'right'},
        loading : Boolean,
        loadingButton : Boolean,
        disabled : Boolean
    },
    setup(props ,context) {

        const isLoading = ref(false)

        const handleClick = ()=>{
            context.emit('click')
        }

        const iconRightShow = computed(()=>{
            if (props.loadingButton){
                return isLoading.value
            }else{
                return !isEmpty(props.icon) && props.iconPosition == 'right'
            }
        })

        const textShow = computed(()=>{
            return context.slots.default != undefined
        })

        const classList = computed(()=>{
            let res = []
            if (props.type){
                res.push('xmv-button--' + props.type)
            }
            if (props.size){
                res.push('xmv-button--' + props.size)
            }
            if (props.disabled){
                res.push('is-disabled')
            }
            let attrs = context.attrs
            if (attrs.plain != null){
                res.push('is-plain')
            }else if (attrs.round != null){
                res.push('is-round')
            }else if (attrs.circle != null){
                res.push('is-circle')
            }else if (attrs.text != null){
                res.push('is-text')
            }else if (attrs.link != null){
                res.push('is-link')
            }
            return res
        })

        const loadingWatch = computed(()=>{
            return props.loading
        })

        watch(loadingWatch ,(newVal)=>{
            isLoading.value = newVal
        })

        return {
            handleClick ,classList ,textShow ,iconRightShow ,loadingWatch ,isLoading
        }
    }
})
</script>

<style scoped lang="less">

</style>