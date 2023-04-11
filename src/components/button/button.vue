<template>
    <button class="xmv-button" :class="classList" type="button" @click.stop="handleClick">
        <i class="xmv-icon" v-if="imgShow">
            <component :is="icon"></component>
        </i>
        <span v-if="textShow">
            <slot></slot>
        </span>
    </button>
</template>

<script>
import {computed, defineComponent} from 'vue'
import search from 'comps/icon/category/search.vue'
import edit from 'comps/icon/category/edit.vue'
import dlt from 'comps/icon/category/delete.vue'
import plus from 'comps/icon/category/plus.vue'
import {isEmpty} from 'utils/data'
export default defineComponent({
    name:"xmvButton",
    emits:['click'],
    props:{
        type : String,
        icon : String
    },
    components:{search ,edit ,dlt ,plus},
    setup(props ,context) {

        const handleClick = ()=>{
            context.emit('click')
        }

        const imgShow = computed(()=>{
            return !isEmpty(props.icon)
        })

        const textShow = computed(()=>{
            return context.slots.default != undefined
        })

        const classList = computed(()=>{
            let res = []
            if (props.type){
                res.push('xmv-button--' + props.type)
            }
            let attrs = context.attrs
            if (attrs.plain != null){
                res.push('is-plain')
            }else if (attrs.round != null){
                res.push('is-round')
            }else if (attrs.circle != null){
                res.push('is-circle')
            }
            return res
        })

        return {
            handleClick ,classList ,textShow ,imgShow
        }
    }
})
</script>

<style scoped lang="less">

</style>