<template>
    <xmv-row>
        <xmv-col :span="12">
            <xmv-form :mode="formData" :rules="rules" label-width="120px">
                <xmv-form-item prop="name" label="姓名">
                    <xmv-input v-model="formData.name"></xmv-input>
                </xmv-form-item>
                <xmv-form-item label="日期">
                    <xmv-date-picker v-model="formData.date"></xmv-date-picker>
                </xmv-form-item>
                <xmv-form-item label="时间">
                    <xmv-time-picker v-model="formData.time"></xmv-time-picker>
                </xmv-form-item>
                <xmv-form-item label="性别">
                    <xmv-radio-group v-model="formData.gender">
                        <xmv-radio label="male">男</xmv-radio>
                        <xmv-radio label="female">女</xmv-radio>
                    </xmv-radio-group>
                </xmv-form-item>
                <xmv-form-item label="类型">
                    <xmv-radio-group v-model="formData.type">
                        <xmv-radio-button label="company">公司</xmv-radio-button>
                        <xmv-radio-button label="person">个人</xmv-radio-button>
                    </xmv-radio-group>
                </xmv-form-item>
            </xmv-form>
        </xmv-col>
    </xmv-row>
    <xmv-row>
        <xmv-col :offset="6">
            <xmv-button @click="handleSubmit">提交</xmv-button>
        </xmv-col>
    </xmv-row>
</template>

<script>
import {defineComponent ,onMounted,reactive} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const formData = reactive({
            name : "",
            time : "",
            date : "2023-05-01",
            gender : "male",
            type : ''
        })

        const rules = reactive({

        })

        const handleSubmit = ()=>{
            console.log(formData)
        }

        onMounted(()=>{
            // setTimeout(()=>{
            //     formData.gender = 'female'
            // } ,3000)
        })

        return {formData ,rules ,handleSubmit}
    }
})
</script>

<style lang="" scoped></style>
