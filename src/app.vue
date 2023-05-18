<template>
    <xmv-row>
        <xmv-col :span="12">
            <xmv-form :mode="formData" :rules="rules">
                <xmv-form-item prop="name" label="姓名">
                    <xmv-input v-model="formData.name"></xmv-input>
                </xmv-form-item>
                <xmv-form-item label="时间">
                    <xmv-time-picker v-model="formData.time"></xmv-time-picker>
                </xmv-form-item>
            </xmv-form>
        </xmv-col>
    </xmv-row>
    <xmv-row>
        <xmv-col>
            <xmv-button @click="handleSubmit">提交</xmv-button>
        </xmv-col>
    </xmv-row>
    
</template>

<script>
import {defineComponent ,reactive} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const formData = reactive({
            name : "",
            time : '11:11:11'
        })

        const rules = reactive({

        })

        const handleSubmit = ()=>{
            console.log(formData)
        }

        return {formData ,rules ,handleSubmit}
    }
})
</script>

<style lang="" scoped></style>
