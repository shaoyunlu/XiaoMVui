<template>
    <xmv-row>
        <xmv-col :span="12">
            <xmv-form :mode="formData" :rules="rules" label-width="120px" style="margin-top:10px">
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
                <xmv-form-item label="特长">
                    <xmv-checkbox-group v-model="formData.speciality">
                        <xmv-checkbox-button label="java">JAVA</xmv-checkbox-button>
                        <xmv-checkbox-button label="rust">RUST</xmv-checkbox-button>
                        <xmv-checkbox-button label="c++">C++</xmv-checkbox-button>
                        <xmv-checkbox-button label="phtyon">PHTYON</xmv-checkbox-button>
                    </xmv-checkbox-group>
                </xmv-form-item>
                <xmv-form-item label="地区">
                    <xmv-select v-model="formData.region">
                        <xmv-option label="浑南区" value="hunnan"></xmv-option>
                        <xmv-option label="沈河区" value="shenhe"></xmv-option>
                        <xmv-option label="和平区" value="heping"></xmv-option>
                        <xmv-option label="铁西区" value="tiexi"></xmv-option>
                        <xmv-option label="沈北区" value="shenbei"></xmv-option>
                    </xmv-select>
                </xmv-form-item>
                <xmv-form-item label="擅长位置">
                    <xmv-select v-model="formData.pos" multiple>
                        <xmv-option label="上路" value="top"></xmv-option>
                        <xmv-option label="中单" value="middle"></xmv-option>
                        <xmv-option label="下路" value="bottom"></xmv-option>
                        <xmv-option label="打野" value="jungle"></xmv-option>
                        <xmv-option label="辅助" value="support"></xmv-option>
                    </xmv-select>
                </xmv-form-item>
                <xmv-form-item label="节点">
                    <xmv-tree-select v-model="formData.node" :data="treeSelectData.data"></xmv-tree-select>
                </xmv-form-item>
                <xmv-form-item label="节点池">
                    <xmv-tree-select v-model="formData.nodeStr" :data="treeSelectData.data" multiple notAssociated></xmv-tree-select>
                </xmv-form-item>
                <xmv-form-item label="颜色">
                    <xmv-color-picker v-model="formData.color"></xmv-color-picker>
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

        const treeSelectData = reactive({
            data : [
                {label : '节点1' ,value:'node1' ,children : [
                    {label : '节点1-1' ,value:'node1-1'},
                    {label : '节点1-2' ,value:'node1-2'}
                ]},
                {label : '节点2' ,value:'node2' ,children : [
                    {label : '节点2-1' ,value:'node2-1'},
                    {label : '节点2-2' ,value:'node2-2'}
                ]},
                {label : '节点3' ,value:'node3' ,children : [
                    {label : '节点3-1' ,value:'node3-1'},
                    {label : '节点3-2' ,value:'node3-2' ,children : [
                        {label : '节点3-2-1' ,value:'node3-2-1' ,children : [
                            {label : '节点3-2-1-1' ,value:'node3-2-1-1'},
                        ]},
                    ]}
                ]}
            ]
        })

        const formData = reactive({
            name : "张三",
            date : "2023-05-01",
            time : "06:30:10",
            gender : "female",
            type : 'person',
            interest : 'sing',
            speciality : 'rust,c++',
            region : 'shenhe',
            pos : 'top,middle',
            node : '',
            nodeStr : 'node1-1',
            color : 'rgb(108 ,170 ,112)'
        })

        const disableRef = ref(true)

        const rules = reactive({

        })

        const handleSubmit = ()=>{
            console.log(toRaw(formData))
        }

        onMounted(()=>{
            setTimeout(()=>{
                //treeSelectData.data = [{label:'111' ,value:'222'}]
                //formData.node = 'node3-2'
            } ,3000)
        })

        return {formData ,rules ,treeSelectData ,handleSubmit ,disableRef}
    }
})
</script>

<style lang="" scoped></style>
