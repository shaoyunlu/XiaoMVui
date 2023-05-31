<template>
    <transition name="xmv-drawer">
        <div class="xmv-overlay" v-show="modelValue">
            <div class="xmv-drawer" :class="computeClass" :style="computeDrawerStyle">
                <header class="xmv-drawer__header">
                    <span class="xmv-drawer__title">{{title}}</span>
                    <button class="xmv-drawer__close-btn" @click="handleCloseClick">
                        <xmv-icon name="close" class="xmv-drawer__close"></xmv-icon>
                    </button>
                </header>
                <div class="xmv-drawer__body">
                    <slot></slot>
                </div>
                <div class="xmv-drawer__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {computed, defineComponent ,ref} from 'vue'
export default defineComponent({
    name:"xmvDrawer",
    props:{
        title : {type:String ,default : ''},
        size : {type:String ,default : '30%'},
        direction : {
            type : String,
            default : 'rtl'
        },
        modelValue : Boolean
    },
    setup(props ,context) {

        const isOpenRef = ref(false)

        const computeClass = computed(()=>{
            let res = []
            if (isOpenRef.value){
                res.push('open')
            }
            res.push(props.direction)
            return res
        })

        const computeDrawerStyle = computed(()=>{
            let res = {}
            let direction = props.direction
            if (direction == 'rtl' || direction == 'ltr'){
                res.width = props.size
            }else{
                res.height = props.size
            }
            return res
        })

        const handleCloseClick = ()=>{
            context.emit('update:modelValue' ,false)
        }

        return {isOpenRef ,computeClass ,computeDrawerStyle ,handleCloseClick}
    }
})
</script>

<style lang="" scoped></style>
