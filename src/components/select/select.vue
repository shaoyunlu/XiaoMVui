<template>
    <xmv-popover :ref="selectMode.popoverRef">
        <template #trigger>
            <div class="xmv-select" 
                :class="computeClass" 
                :ref="selectMode.selectRef"
                @click="handleActive">
                <div class="select-trigger">
                    <xmv-select-tags v-if="selectMode.multiple.value"></xmv-select-tags>
                    <xmv-input 
                        :placeholder="computePlaceholder" 
                        suffixicon="arrowDown" 
                        :ref="selectMode.inputRef"></xmv-input>
                </div>
            </div>
        </template>
        <div class="xmv-select-dropdown" :class="computeClass" 
            :style="{'min-width' : selectMode.rctData.dropdownWidth + 'px'}">
            <xmv-scrollbar :maxHeightFlag="true">
                <ul class="xmv-select-dropdown__list">
                    <xmv-select-item v-if="type == 'select'" 
                        v-for="tmp in selectMode.rctData.options" :data="tmp"></xmv-select-item>
                    <xmv-tree v-if="type == 'tree'" 
                        :ref="selectMode.treeRef"
                        :showCheckbox="multiple"
                        :notAssociated="notAssociated"
                        @nodeClick="handleNodeClick"
                        @nodeCheck="handleNodeCheck"></xmv-tree>
                </ul>
            </xmv-scrollbar>
        </div>
    </xmv-popover>
    <slot></slot>
</template>

<script>
import {defineComponent, onMounted, provide, reactive ,computed, nextTick ,watch} from 'vue'
import SelectMode from './mode/selectMode'
import xmvSelectItem from './item.vue'
import {createEventBus} from 'utils/event'
import {isEmpty} from 'utils/data'
import {find ,filter} from 'utils/data'
export default defineComponent({
    name:"xmvSelect",
    components:{xmvSelectItem},
    emits : ['nodeClick' ,'nodeCheck' ,'update:modelValue'],
    props:{
        disabled : String,
        multiple : String,
        collapseTags : String,
        maxcollapseTags : Number,
        filterable : String,
        type:{type:String ,default:'select'},
        notAssociated : String,
        modelValue : [String,Number]
    },
    components:{xmvSelectItem},
    setup(props ,context) {

        const selectMode = new SelectMode(props)

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        const computeClass = computed(()=>{
            let res = []
            if (selectMode.disabled.value){
                res.push('xmv-select--disabled')
            }
            if (selectMode.multiple.value){
                res.push('is-multiple')
            }
            return res
        })

        const computePlaceholder = computed(()=>{
            if (selectMode.rctData.sData.length == 0){
                return '请选择'
            }else{
                return ''
            }
        })

        provide('SelectMode' ,selectMode)
        provide('EventBus' ,{$on ,$emit})

        $on('itemClick' ,(data)=>{
            selectMode.inputRef.value.focus()
            if (selectMode.multiple.value){
                nextTick(()=>{
                    selectMode.adjustWH()
                })
                if (props.modelValue != undefined){
                    context.emit('update:modelValue' ,selectMode.getSelectedValList().join(','))
                }
                context.emit('nodeCheck' ,selectMode.rctData.sData)
            }else{
                let selectData = selectMode.rctData.sData[0]
                selectMode.inputRef.value.val(selectData.label)
                selectMode.popoverRef.value.hide()
                context.emit('update:modelValue' ,selectData.value)
            }
        })

        $on('itemClose' ,data =>{
            if (props.type == 'tree'){
                data.isChecked = false
            }
        })

        const handleActive = ()=>{
            if (!selectMode.disabled.value){
                selectMode.inputRef.value.focus()
                selectMode.popoverRef.value.enable()
            }
        }

        const loadTreeData = (data)=>{
            selectMode.treeRef.value.loadData(data)
        }

        const handleNodeClick = (node)=>{
            selectMode.inputRef.value.val(node.label)
            selectMode.popoverRef.value.hide()
            context.emit('nodeClick' ,node)
        }

        const handleNodeCheck = (nodeList)=>{
            selectMode.rctData.sData = nodeList
            nextTick(()=>{
                selectMode.adjustWH()
            })
            context.emit('nodeCheck' ,nodeList)
        }

        const setTreeMultipleValue = (value)=>{
            selectMode.treeRef.value.setMultipleValue(value ,(list)=>{
                selectMode.rctData.sData = list
            })
        }

        const setTreeValue = (value)=>{
            selectMode.treeRef.value.setValue(value)
        }

        const modelValueWatch = computed(()=>{
            return props.modelValue
        })

        watch(modelValueWatch ,(newVal)=>{
            handleWatch(newVal)
        })

        const handleWatch = (val)=>{
            val = (val == null ? '': val)
            if (props.multiple != undefined){
                let list = val.split(',')
                selectMode.rctData.sData = []
                list.forEach(item =>{
                    let __data = filter(selectMode.rctData.options ,tmp=>{
                        return tmp.value == item
                    })
                    if (!isEmpty(__data)){
                        selectMode.rctData.sData.push(__data[0])
                    }
                })
            }else{
                selectMode.rctData.sData = filter(selectMode.rctData.options ,tmp=>{
                    return tmp.value == val
                })
                selectMode.inputRef.value.val(selectMode.rctData.sData[0].label) 
            }
            
            nextTick(()=>{
                $emit('setVal')
            })
        }

        onMounted(()=>{
            selectMode.rctData.dropdownWidth = selectMode.selectRef.value.clientWidth - 2

            if (selectMode.disabled.value){
                selectMode.inputRef.value.disabled()
                selectMode.popoverRef.value.disabled()
            }

            if (selectMode.multiple.value){
                // 需要设置最小高度
                selectMode.inputRef.value.inputRef.style['min-height'] = '30px'
            }

            if (!selectMode.filterable){
                selectMode.inputRef.value.inputRef.setAttribute('readonly' ,'')
            }

            if (!isEmpty(props.modelValue)){
                handleWatch(props.modelValue)
            }
        })

        return {selectMode ,computeClass ,computePlaceholder,loadTreeData,
                handleActive ,handleNodeClick ,handleNodeCheck ,setTreeValue ,setTreeMultipleValue}
    }
})
</script>

<style lang="" scoped></style>
