<template>
    <div :class="class">
        <div class="xmv-upload xmv-upload--text" @mouseup="handleUploadClick" v-if="listType == 'text'">
            <slot></slot>
            <input class="xmv-upload__input" name="file" multiple="" accept="" type="file" ref="uploadInpRef"/>
        </div>
        <slot name="tip" v-if="listType == 'text'"></slot>
        
        <ul class="xmv-upload-list" :class="['xmv-upload-list--'+listType]">
            <transition-group name="xmv-list">
                <xmv-upload-item v-for="(item,index) in fileList" :data="item" :key="index" :listType="listType"></xmv-upload-item>
            </transition-group>
            <div class="xmv-upload xmv-upload--picture-card" v-if="listType == 'picture-card'"
                @mouseup="handleUploadClick">
                <slot></slot>
                <input class="xmv-upload__input" name="file" multiple="" accept="" type="file" ref="uploadInpRef"/>
            </div>
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
        fileList : Array,
        limit : Number,
        listType : {type :String ,default:'text'}
    },
    setup(props ,{slots}) {

        const uploadInpRef = ref(null)

        const handleUploadClick = ()=>{
            uploadInpRef.value.click()
        }

        const handleLimit = (file)=>{
            let limit = props.limit
            if (limit == undefined){
                props.fileList.push({name : file.name})
            }else if (limit == 1){
                if (props.fileList.length == 0)
                    props.fileList.push({name : file.name})
                else
                    props.fileList[0].name = file.name
            }
        }

        onMounted(()=>{
            uploadInpRef.value.addEventListener('change' ,event =>{
                let file = event.target.files[0];

                const reader = new FileReader()

                reader.addEventListener('load' ,event =>{
                    handleLimit(file)
                })
                reader.readAsArrayBuffer(file)
            })
        })

        return {uploadInpRef ,handleUploadClick}
    }
})
</script>

<style lang="" scoped></style>
