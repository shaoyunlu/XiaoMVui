<template>
    <transition name="xmv-message" v-show="isShow" v-if="isDisplay" @after-leave="handleLeave">
        <div>
            <div class="xmv-message" :class="computeClass" :style="{top:top+'px'}">
                <xmv-icon :name="type + 'Filled'" class="xmv-message__icon" :class="computeIconClass"></xmv-icon>
                <p class="xmv-message__content">{{message}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
import {defineComponent ,ref, onMounted, watch ,nextTick, computed} from 'vue'
import xmvIcon  from 'comps/icon/icon.vue'
export default defineComponent({
    name:"xmvMessage",
    components:{xmvIcon},
    props:{
        top : {type:Number ,default:20},
        message : String,
        instances : Array,
        type : {type:String ,default : 'info'}
    },
    setup(props ,context) {

        const isShow = ref(false)
        const isDisplay = ref(false)

        // watch(props.instances ,(newVal)=>{

        // })

        const computeClass = computed(()=>{
            return ['xmv-message--' + props.type]
        })

        const computeIconClass = computed(()=>{
            return ['xmv-message-icon--' + props.type]
        })

        const handleLeave = ()=>{
            isDisplay.value = false
            context.emit('destroy')
        }

        onMounted(()=>{
            isDisplay.value = true
            nextTick(()=>{
                isShow.value = true
            })

            setTimeout(()=>{
                isShow.value = false
            } ,300000)
        })

        return {isShow ,isDisplay, computeClass , computeIconClass,handleLeave}
    }
})
</script>

<style lang="" scoped></style>
