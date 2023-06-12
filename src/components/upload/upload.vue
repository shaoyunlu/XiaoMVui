<template>
    <div :class="class">
        <div class="xmv-upload xmv-upload--text" @mouseup="handleUploadClick">
            <slot></slot>
            <input class="xmv-upload__input" name="file" multiple="" accept="" type="file" ref="uploadInpRef"/>
        </div>
        <slot name="tip"></slot>
        <ul class="xmv-upload-list xmv-upload-list--text">
            <xmv-upload-item v-for="item in fileList" :data="item"></xmv-upload-item>
        </ul>
    </div>
</template>

<script>
import {defineComponent, h ,onMounted,ref} from 'vue'
import xmvUploadItem from './item.vue'
export default defineComponent({
    name:"",
    components:{xmvUploadItem},
    props:{
        class : String,
        fileList : Array
    },
    setup(props ,{slots}) {

        const uploadInpRef = ref(null)

        const handleUploadClick = ()=>{
            uploadInpRef.value.click()
        }

        onMounted(()=>{
            uploadInpRef.value.addEventListener('change' ,event =>{
                let file = event.target.files[0];

                const reader = new FileReader()

                reader.addEventListener('load' ,event =>{
                    props.fileList.push({name : file.name})
                })
                reader.readAsArrayBuffer(file)
            })
        })

        return {uploadInpRef ,handleUploadClick}
    }
})
</script>

<style lang="" scoped></style>
