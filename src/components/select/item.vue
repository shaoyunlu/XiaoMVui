<template>
    <li class="xmv-select-dropdown__item" @mouseover="handleMouseover" @click="handleClick"
        :class="{'hover' : isHover  ,'selected' : isSelect}">
        <span>{{data.label}}</span>
    </li>
</template>

<script>
import {defineComponent, inject ,ref} from 'vue'
import {find ,filter} from 'utils/data'
export default defineComponent({
    name:"",
    props:{
        data : Object
    },
    setup(props ,context) {

        const selectMode = inject('SelectMode')
        const {$on ,$emit} = inject('EventBus')
        const isHover = ref(false)
        const isSelect = ref(false)
        $on('itemClick' ,()=>{
            let res = find(selectMode.rctData.sData ,(tmp)=>{
                return tmp.value == props.data.value
            })
            isSelect.value = (res != undefined)
        })

        const handleMouseover = ()=>{

        }

        const handleClick = ()=>{
            if (selectMode.multiple.value){
                // 切换
                let pData = props.data
                let res = find(selectMode.rctData.sData ,(tmp)=>{
                    return tmp.value == pData.value
                })
                if (res){
                    selectMode.rctData.sData = filter(selectMode.rctData.sData ,(tmp)=>{
                        return tmp.value != res.value
                    })
                }else{
                    selectMode.rctData.sData.push(props.data)
                }
            }else{
                selectMode.rctData.sData = []
                selectMode.rctData.sData.push(props.data)
            }
            $emit('itemClick')
        }

        return {handleMouseover ,handleClick ,isHover ,isSelect}
    }
})
</script>

<style lang="" scoped></style>
