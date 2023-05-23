<template>
    <xmv-row>
        <xmv-col :span="12">
            <xmv-form :mode="formData" :rules="rules" label-width="120px" style="margin-top:100px">
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
                <xmv-form-item label="爱好">
                    <xmv-checkbox-group v-model="formData.interest">
                        <xmv-checkbox label="basketball">篮球</xmv-checkbox>
                        <xmv-checkbox label="sing">唱歌</xmv-checkbox>
                        <xmv-checkbox label="game">游戏</xmv-checkbox>
                    </xmv-checkbox-group>
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
import {defineComponent ,onMounted,reactive, ref ,toRaw} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const formData = reactive({
            name : "张三",
            date : "2023-05-01",
            time : "06:30:10",
            gender : "female",
            type : 'person',
            interest : 'sing'
        })

        const disableRef = ref(true)

        const rules = reactive({

        })

        const handleSubmit = ()=>{
            console.log(toRaw(formData))
        }

        onMounted(()=>{
            setTimeout(()=>{

            } ,3000)
        })

        return {formData ,rules ,handleSubmit ,disableRef}
    }
})
</script>

<style lang="" scoped></style>
