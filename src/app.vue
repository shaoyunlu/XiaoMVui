<template>
    <xmv-dialog title="标题" width="30%" v-model="dialogVisible">
        <span>this is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <xmv-button type="primary">
                    确认
                </xmv-button>
            </span>
        </template>
    </xmv-dialog>
    <xmv-dialog title="标题" v-model="dialogVisible2">
        <template #default>
            默认内容
            <xmv-dialog
                v-model="innerVisible"
                width="30%"
                title="Inner Dialog"
            />
        </template>
        <template #footer>
            <span class="dialog-footer">
                <xmv-button type="primary" @click="handleDialogEnterClick">
                    确认
                </xmv-button>
            </span>
        </template>
    </xmv-dialog>
    <header class="navbar has-sidebar">  
        <xmv-menu ref="horizontalMenuRef" :isVertical="false"></xmv-menu>
    </header>
    <div class="sidebar">
        <xmv-scrollbar :explicit="true">
            <xmv-menu ref="sideBarMenuRef"></xmv-menu>
        </xmv-scrollbar>
    </div>
    <main id="page-content" class="page-content has-sidebar">
        <xmv-row>
            <xmv-col :span="8">
                <xmv-form :mode="form" :rules="rules">
                    <xmv-form-item label="真实姓名" prop="name">
                        <xmv-input v-model="form.name" />
                    </xmv-form-item>
                    <xmv-form-item label="年龄" prop="age">
                        <xmv-input v-model="form.age" />
                    </xmv-form-item>
                </xmv-form>
            </xmv-col>
        </xmv-row>
        <xmv-row>
            <xmv-col>
                <xmv-tree ref="treeRef" show-checkbox not-associated>
                    <template #default="{node}">
                        <span class="custom-tree-node">
                            <span>{{node.label}}</span>
                        </span>
                    </template>
                </xmv-tree>
            </xmv-col>
        </xmv-row>
        <xmv-row>
            <xmv-col>
                <xmv-button @click="handleDialogClick">点击</xmv-button>
                <xmv-button type="primary">primary</xmv-button>
                <xmv-button plain>点击</xmv-button>
                <xmv-button type="primary" plain>点击</xmv-button>
                <xmv-button round>点击</xmv-button>
                <xmv-button type="primary" round>点击</xmv-button>
                <xmv-button circle icon="search"></xmv-button>
                <xmv-button circle icon="dlt"></xmv-button>
                <xmv-button circle icon="edit"></xmv-button>
                <xmv-button circle icon="plus"></xmv-button>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="9" :offset="1">
                <xmv-radio-group>
                    <xmv-radio label="1">Option 1</xmv-radio>
                    <xmv-radio label="2">Option 2</xmv-radio>
                    <xmv-radio label="3">Option 3</xmv-radio>
                </xmv-radio-group>
            </xmv-col>
            <xmv-col :span="9" :offset="1">
                <xmv-radio-group>
                    <xmv-radio label="1" disabled>Option 1</xmv-radio>
                    <xmv-radio label="2" disabled>Option 2</xmv-radio>
                    <xmv-radio label="2">Option 2</xmv-radio>
                </xmv-radio-group>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="9" :offset="1">
                <xmv-radio-group>
                    <xmv-radio-button label="1">Option 1</xmv-radio-button>
                    <xmv-radio-button label="2">Option 2</xmv-radio-button>
                    <xmv-radio-button label="3" disabled>Option 3</xmv-radio-button>
                </xmv-radio-group>
            </xmv-col>
            <xmv-col :span="9" :offset="1">
                <xmv-radio-group>
                    <xmv-radio-button label="1" size="small">Option 1</xmv-radio-button>
                    <xmv-radio-button label="2" size="small">Option 2</xmv-radio-button>
                    <xmv-radio-button label="3" size="small">Option 3</xmv-radio-button>
                </xmv-radio-group>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="9" :offset="1">
                <xmv-checkbox label="test1">Checkbox 1</xmv-checkbox>
                <xmv-checkbox label="test2" disabled>Checkbox 2</xmv-checkbox>
            </xmv-col>
            <xmv-col :span="9" :offset="1">
                <xmv-checkbox-group>
                    <xmv-checkbox label="test1">Checkbox 1</xmv-checkbox>
                    <xmv-checkbox label="test2">Checkbox 2</xmv-checkbox>
                </xmv-checkbox-group>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="9" :offset="1">
                <xmv-checkbox-group>
                    <xmv-checkbox-button label="test1">Checkbox 1</xmv-checkbox-button>
                    <xmv-checkbox-button label="test2" disabled>Checkbox 2</xmv-checkbox-button>
                </xmv-checkbox-group>
            </xmv-col>
            <xmv-col :span="9" :offset="1">
                <xmv-checkbox-group>
                    <xmv-checkbox-button label="test1" size="small">Checkbox 1</xmv-checkbox-button>
                    <xmv-checkbox-button label="test2" size="small">Checkbox 2</xmv-checkbox-button>
                </xmv-checkbox-group>
            </xmv-col>

        </xmv-row>

        <xmv-row>
            <xmv-col>
                <xmv-tag>Test Tag</xmv-tag>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="6">
                <xmv-tree-select ref="treeSelectRef"></xmv-tree-select>
            </xmv-col>

            <xmv-col :span="6" :offset="3">
                <xmv-tree-select ref="treeSelect2Ref" multiple not-associated></xmv-tree-select>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="6">
                <xmv-select>
                    <xmv-option v-for="tmp in selectData" :label="tmp.label" :value="tmp.value"></xmv-option>
                </xmv-select>
            </xmv-col>
            <xmv-col :span="6" :offset="3">
                <xmv-select disabled>
                    <xmv-option v-for="tmp in selectData" :label="tmp.label" :value="tmp.value"></xmv-option>
                </xmv-select>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="6">
                <xmv-select multiple>
                    <xmv-option v-for="tmp in selectData" :label="tmp.label" :value="tmp.value"></xmv-option>
                </xmv-select>
            </xmv-col>
            <xmv-col :span="6" :offset="3">
                <xmv-select multiple collapse-tags>
                    <xmv-option v-for="tmp in selectData" :label="tmp.label" :value="tmp.value"></xmv-option>
                </xmv-select>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="5">
                <xmv-date-picker></xmv-date-picker>
            </xmv-col>
            <xmv-col :span="10" :offset="3">
                <xmv-date-picker type="daterange"></xmv-date-picker>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="5">
                <xmv-time-picker></xmv-time-picker>
            </xmv-col>
            <xmv-col :span="10" :offset="3">
                
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="6">
                <xmv-tooltip content="测试">
                    <span>查看</span>
                </xmv-tooltip>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="6">
                <xmv-input size="large"></xmv-input>
            </xmv-col>
            <xmv-col :span="6" :offset="6">
                <xmv-input disabled></xmv-input>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="6">
                <xmv-input type="password" showpassword clearable></xmv-input>
            </xmv-col>
            <xmv-col :span="6" :offset="6">
                <xmv-input clearable></xmv-input>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col :span="5">
                <xmv-input suffixicon="search" prefixicon="calendar"></xmv-input>
            </xmv-col>
            <xmv-col :span="6" :offset="6">
                <xmv-input suffixicon="calendar"></xmv-input>
            </xmv-col>
        </xmv-row>

        <xmv-row>
            <xmv-col>
                <xmv-table ref="tableRef" height="300" v-loading:fullscreen="tableLoading">
                    <xmv-table-column prop="name" label="姓名" width="400">
                        <template>
                            <xmv-button>点击1</xmv-button>
                            <xmv-button>点击2</xmv-button>
                        </template>
                    </xmv-table-column>
                    <xmv-table-column prop="age" label="年龄" width="200"></xmv-table-column>
                    <xmv-table-column prop="height" label="身高" width="800"></xmv-table-column>
                </xmv-table>
            </xmv-col>
        </xmv-row>
    </main>
</template>

<script>
import {defineComponent,onMounted,reactive,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const horizontalMenuRef = ref(null)
        const sideBarMenuRef = ref(null)

        // const handleCollapse = ()=>{
        //     menuRef.value.collapse()
        // }

        // const handleExpand = ()=>{
        //     menuRef.value.expand()
        // }

        const dialogVisible = ref(false)
        const dialogVisible2 = ref(false)
        const innerVisible = ref(false)
        const tableLoading = ref(false)

        const handleDialogClick = ()=>{
            //dialogVisible2.value = true
            //tableLoading.value = true
            console.log(form)
        }

        const handleDialogEnterClick = ()=>{
            innerVisible.value = true
        }
        

        const treeRef = ref(null)
        const treeSelectRef = ref(null)
        const treeSelect2Ref = ref(null)

        const treeData = [
            {
                label: 'Level one 1',
                value: 'Level one 1',
                children: [
                {
                    label: 'Level two 1-1',
                    value: 'Level two 1-1',
                    children: [
                    {
                        label: 'Level three 1-1-1',
                        value: 'Level three 1-1-1',
                    },
                    ],
                },
                ],
            },
            {
                label: 'Level one 2',
                value: 'Level one 2',
                children: [
                {
                    label: 'Level two 2-1',
                    value: 'Level two 2-1',
                    children: [
                    {
                        label: 'Level three 2-1-1',
                        value: 'Level three 2-1-1'
                    },
                    ],
                },
                {
                    label: 'Level two 2-2',
                    value: 'Level two 2-2',
                    children: [
                    {
                        label: 'Level three 2-2-1',
                        value: 'Level three 2-2-1'
                    },
                    ],
                },
                ],
            },
            {
                label: 'Level one 3',
                value: 'Level one 3',
                children: [
                {
                    label: 'Level two 3-1',
                    value: 'Level two 3-1',
                    children: [
                    {
                        label: 'Level three 3-1-1',
                        value: 'Level three 3-1-1'
                    },
                    ],
                },
                {
                    label: 'Level two 3-2',
                    value: 'Level two 3-2',
                    children: [
                    {
                        label: 'Level three 3-2-1',
                        value: 'Level three 3-2-1'
                    },
                    ],
                },
                ],
            },
        ]

        const treeData1 = [
            {
                label: 'Level one 1',
                value: 'Level one 1',
                children: [
                {
                    label: 'Level two 1-1',
                    value: 'Level two 1-1',
                    children: [
                    {
                        label: 'Level three 1-1-1',
                        value: 'Level three 1-1-1',
                    },
                    ],
                },
                ],
            },
            {
                label: 'Level one 2',
                value: 'Level one 2',
                children: [
                {
                    label: 'Level two 2-1',
                    value: 'Level two 2-1',
                    children: [
                    {
                        label: 'Level three 2-1-1',
                        value: 'Level three 2-1-1'
                    },
                    ],
                },
                {
                    label: 'Level two 2-2',
                    value: 'Level two 2-2',
                    children: [
                    {
                        label: 'Level three 2-2-1',
                        value: 'Level three 2-2-1'
                    },
                    ],
                },
                ],
            },
            {
                label: 'Level one 3',
                value: 'Level one 3',
                children: [
                {
                    label: 'Level two 3-1',
                    value: 'Level two 3-1',
                    children: [
                    {
                        label: 'Level three 3-1-1',
                        value: 'Level three 3-1-1'
                    },
                    ],
                },
                {
                    label: 'Level two 3-2',
                    value: 'Level two 3-2',
                    children: [
                    {
                        label: 'Level three 3-2-1',
                        value: 'Level three 3-2-1'
                    },
                    ],
                },
                ],
            },
        ]

        const treeData2 = [
            {
                label: 'Level one 1',
                value: 'Level one 1',
                children: [
                {
                    label: 'Level two 1-1',
                    value: 'Level two 1-1',
                    children: [
                    {
                        label: 'Level three 1-1-1',
                        value: 'Level three 1-1-1',
                    },
                    ],
                },
                ],
            },
            {
                label: 'Level one 2',
                value: 'Level one 2',
                children: [
                {
                    label: 'Level two 2-1',
                    value: 'Level two 2-1',
                    children: [
                    {
                        label: 'Level three 2-1-1',
                        value: 'Level three 2-1-1'
                    },
                    ],
                },
                {
                    label: 'Level two 2-2',
                    value: 'Level two 2-2',
                    children: [
                    {
                        label: 'Level three 2-2-1',
                        value: 'Level three 2-2-1'
                    },
                    ],
                },
                ],
            },
            {
                label: 'Level one 3',
                value: 'Level one 3',
                children: [
                {
                    label: 'Level two 3-1',
                    value: 'Level two 3-1',
                    children: [
                    {
                        label: 'Level three 3-1-1',
                        value: 'Level three 3-1-1'
                    },
                    ],
                },
                {
                    label: 'Level two 3-2',
                    value: 'Level two 3-2',
                    children: [
                    {
                        label: 'Level three 3-2-1',
                        value: 'Level three 3-2-1'
                    },
                    ],
                },
                ],
            },
        ]

        const horizontalMenuData = [
            {name : '菜单一'},
            {name : '菜单二'},
            {name : '菜单三' ,childNodes : [
                {name : '菜单三-一' ,active : true},
                {name : '菜单三-二',childNodes:[
                    {name : '菜单三-二-一'}
                ]}
            ]}
        ]

        const sideBarMenuData = [
            {name : '菜单1'},
            {name : '菜单2' ,childNodes : [
                {name : '菜单2-1'},
                {name : '菜单2-2'},
                {name : '菜单2-3'},
                {name : '菜单2-4'},
            ]},
            {name : '菜单3'},
            {name : '菜单4'},
            {name : '菜单5'},
            {name : '菜单6' ,childNodes : [
                {name : '菜单6-1'},
                {name : '菜单6-2'},
                {name : '菜单6-3'},
                {name : '菜单6-4'},
            ]},
            {name : '菜单7' ,childNodes : [
                {name : '菜单7-1'},
                {name : '菜单7-2'},
                {name : '菜单7-3'},
                {name : '菜单7-4'},
                {name : '菜单7-6'},
                {name : '菜单7-7'},
            ]},
            {name : '菜单8' ,childNodes : [
                {name : '菜单8-1' ,active : true},
                {name : '菜单8-2',childNodes:[
                    {name : '菜单8-2-1'}
                ]}
            ]}
        ]

        const tableRef = ref(null)

        const tableData = [
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '180'},
            {name : '张三' ,age : '20' ,height : '181'},
        ]

        const selectData = [
            {label : 'Label1' ,value : 'Value1'},
            {label : 'Label2' ,value : 'Value2'},
            {label : 'Label3' ,value : 'Value3'},
            {label : 'Label4' ,value : 'Value4'},
            {label : 'Label1' ,value : 'Value5'},
            {label : 'Label2' ,value : 'Value6'},
            {label : 'Label3' ,value : 'Value7'},
            {label : 'Label4' ,value : 'Value8'},
            {label : 'Label1' ,value : 'Value9'},
            {label : 'Label2' ,value : 'Value10'},
            {label : 'Label3' ,value : 'Value11'},
            {label : 'Label4' ,value : 'Value12'}
        ]

        const form = reactive({
            name : '张三',
            age : '18'
        })

        const rules = reactive({
            name : [{required : true}]
        })

        onMounted(()=>{
            horizontalMenuRef.value.loadData(horizontalMenuData)
            sideBarMenuRef.value.loadData(sideBarMenuData)
            tableRef.value.loadData(tableData)
            treeRef.value.loadData(treeData)
            treeSelectRef.value.loadData(treeData1)
            treeSelect2Ref.value.loadData(treeData2)
        })

        return {
            horizontalMenuRef,sideBarMenuRef,tableRef ,selectData ,treeRef ,treeSelectRef ,treeSelect2Ref,form,rules,
            handleDialogClick ,dialogVisible ,dialogVisible2 ,innerVisible ,handleDialogEnterClick,tableLoading
        }
    }
})
</script>

<style scoped lang="less">
    ul li{
        margin : 30px 0
    }
</style>