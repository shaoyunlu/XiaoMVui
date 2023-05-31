<template>
    <transition name="xmv-message-box" v-show="isShow" v-if="isDisplay" @after-leave="handleLeave">
        <div class="xmv-overlay is-message-box" ref="messageBoxRef">
            <div class="xmv-overlay-message-box">
                <div class="xmv-message-box">
                    <div class="xmv-message-box__header">
                        <div class="xmv-message-box__title">
                            <span>{{title}}</span>
                        </div>
                        <button class="xmv-message-box__headerbtn">
                            <xmv-icon name="close" class="xmv-message-box__close" @click="handleClose"></xmv-icon>
                        </button>
                    </div>
                    <div class="xmv-message-box__content">
                        <div class="xmv-message-box__container">
                            <div class="xmv-message-box__message">
                                <p>{{message}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="xmv-message-box__btns">
                        <xmv-button @click="handleClose" v-if="isShowCloseButton">取消</xmv-button>
                        <xmv-button type="primary" @click="handleEnter">确认</xmv-button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {defineComponent ,nextTick,onMounted,onUnmounted,onBeforeUnmount,ref} from 'vue'
import xmvButton from 'comps/button/button.vue'
import xmvIcon  from 'comps/icon/icon.vue'
export default defineComponent({
    name:"xmvMessageBox",
    props:{
        title : String,
        message : String
    },
    components : {xmvButton ,xmvIcon},
    emits : ['leave'],
    setup(props ,context) {

        const messageBoxRef = ref(null)

        const isShow = ref(false)
        const isDisplay = ref(false)
        const isShowCloseButton = ref(false)

        let currentResolve
        let currentReject

        const setAlert = ()=>{
            isShowCloseButton.value = false
            currentResolve = null
            currentReject = null
        }

        const setConfirm = (resolve ,reject)=>{
            isShowCloseButton.value = true
            currentResolve = resolve
            currentReject = reject
        }

        const show = ()=>{
            isDisplay.value = true
            nextTick(()=>{
                isShow.value = true
            })
        }

        const handleClose = ()=>{
            currentReject && currentReject('')
            isShow.value = false
        }

        const handleEnter = ()=>{
            currentResolve && currentResolve('')
            isShow.value = false
        }

        const handleLeave = ()=>{
            isDisplay.value = false
            context.emit('leave')
        }

        onBeforeUnmount(()=>{
        })

        onUnmounted(()=>{
        })

        onMounted(()=>{
            
        })

        return {isShow , isDisplay ,isShowCloseButton ,messageBoxRef ,
                show ,handleClose ,handleLeave ,handleEnter ,setAlert ,setConfirm}
    }
})
</script>

<style lang="" scoped></style>
