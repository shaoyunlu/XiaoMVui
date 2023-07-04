<template>
    <span class="xmv-breadcrumb__item">
        <span class="xmv-breadcrumb__inner" :class="{'is-link':(to != undefined)}" @click="handleClick">
            <slot></slot>
        </span>
        <span class="xmv-breadcrumb__separator">{{separator}}</span>
    </span>
</template>

<script>
import {defineComponent, inject} from 'vue'
export default defineComponent({
    name:"xmvBreadcrumbItem",
    props:{
        separator : {type:String ,default:'/'},
        to : Object
    },
    setup({to} ,context) {

        const {$on ,$emit} = inject('EventBus')

        const handleClick = ()=>{
            if(to != undefined){
                $emit('route' ,to)
            } 
        }

        return {handleClick}
    }
})
</script>

<style lang="" scoped></style>
