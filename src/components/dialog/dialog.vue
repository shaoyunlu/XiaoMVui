<template>
    <transition name="xmv-dialog">
        <div class="xmv-overlay" v-show="modelValue">
            <div class="xmv-overlay-dialog">
                <div class="xmv-dialog" :style="computeStyle" ref="dialogRef">
                    <header class="xmv-dialog__header">
                        <span class="xmv-dialog__title">
                            {{title}}
                        </span>
                        <button class="xmv-dialog__headerbtn" @click="handleCloseClick">
                            <xmv-icon name="close" class="xmv-dialog__close"></xmv-icon>
                        </button>
                    </header>
                    <div class="xmv-dialog__body">
                        <slot></slot>
                    </div>
                    <footer class="xmv-dialog__footer">
                        <slot name="footer"></slot>
                    </footer>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {computed, defineComponent ,onMounted,ref, watch} from 'vue'
import XmvTransition from 'comps/transition/transition'
export default defineComponent({
    name:"",
    props:{
        title : {type:String ,default : ''},
        width : String,
        modelValue : Boolean
    },
    setup(props ,context) {

        const isShow = ref(true)
        const dialogRef = ref(null)
        const transition = new XmvTransition()

        const computeStyle = computed(()=>{
            if (props.width != undefined){
                return {'--xmv-dialog-width' : props.width}
            }
        })

        const handleCloseClick = ()=>{
            context.emit('update:modelValue' ,false)
        }

        onMounted(()=>{
            transition.setEl(dialogRef.el)
        })

        return {dialogRef ,isShow,handleCloseClick ,computeStyle}
    }
})
</script>

<style lang="" scoped>
    
</style>
