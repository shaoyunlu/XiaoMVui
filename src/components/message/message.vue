<template>
    <transition name="xmv-message" v-show="isShow" v-if="isDisplay" @after-leave="handleLeave">
        <div>
            <div class="xmv-message xmv-message--info">
                <xmv-icon name="close" class="xmv-message__icon xmv-message-icon--info"></xmv-icon>
                <p class="xmv-message__content">{{message}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
import {defineComponent ,ref, onMounted, watch ,nextTick} from 'vue'
import xmvIcon  from 'comps/icon/icon.vue'
export default defineComponent({
    name:"xmvMessage",
    components:{xmvIcon},
    props:{
        message : String,
        instances : Array
    },
    setup(props ,context) {

        const isShow = ref(false)
        const isDisplay = ref(false)

        watch(props.instances ,(newVal)=>{
            console.log(newVal)
        })

        const handleLeave = ()=>{

        }

        onMounted(()=>{
            isDisplay.value = true
            nextTick(()=>{
                isShow.value = true
            })
        })

        return {isShow ,isDisplay, handleLeave}
    }
})
</script>

<style lang="" scoped></style>
