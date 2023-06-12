<template>
    <transition name="xmv-list">
        <li class="xmv-upload-list__item is-success" v-if="data.isShow">
            <div class="xmv-upload-list__item-info">
                <a class="xmv-upload-list__item-name">
                    <xmv-icon name="document"></xmv-icon>
                    <span class="xmv-upload-list__item-file-name">{{data.name}}</span>
                </a>
            </div>
            <label class="xmv-upload-list__item-status-label">
                <xmv-icon class="xmv-icon--upload-success" name="circleCheck"></xmv-icon>
            </label>
            <xmv-icon name="close" class="xmv-icon--close" @click="handleClose"></xmv-icon>
        </li>
    </transition>
</template>

<script>
import {defineComponent, onMounted} from 'vue'
export default defineComponent({
    name:"",
    props : {
        data : Object
    },
    setup({data} ,context) {

        const handleClose = ()=>{
            data.isShow = false
        }

        onMounted(()=>{
            data.isShow = true
        })

        return {handleClose}
    }
})
</script>

<style lang="" scoped></style>
