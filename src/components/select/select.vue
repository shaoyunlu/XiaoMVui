<template>
    <xmv-popover placement="bottom" :ref="selectMode.popoverRef">
        <template #trigger>
            <div class="xmv-select" :class="computeClass" :ref="selectMode.selectRef">
                <div class="select-trigger">
                    <xmv-select-tags></xmv-select-tags>
                    <xmv-input :placeholder="computePlaceholder" suffixicon="arrowDown" :ref="selectMode.inputRef"></xmv-input>
                </div>
            </div>
        </template>
        <div class="xmv-select-dropdown" :class="computeClass"
            :style="{'min-width' : selectMode.rctData.dropdownWidth + 'px'}">
            <xmv-scrollbar :maxHeightFlag="true">
                <ul class="xmv-select-dropdown__list">
                    <xmv-select-item v-for="tmp in selectMode.rctData.options" :data="tmp"></xmv-select-item>
                </ul>
            </xmv-scrollbar>
        </div>
    </xmv-popover>
    <slot></slot>
</template>

<script>
import {defineComponent, onMounted, provide, reactive ,computed, nextTick} from 'vue'
import SelectMode from './mode/selectMode'
import xmvSelectItem from './item.vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvSelect",
    components:{xmvSelectItem},
    props:{
        disabled : String,
        multiple : String,
        collapsetags : String,
        maxcollapsetags : Number
    },
    components:{xmvSelectItem},
    setup(props ,context) {

        const selectMode = new SelectMode(props)

        const eventBus = reactive({
            listeners : {}
        })

        const computeClass = computed(()=>{
            let res = []
            if (props.disabled != undefined){
                res.push('xmv-select--disabled')
            }
            if (props.multiple != undefined){
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

        const {$on ,$emit} = createEventBus(eventBus)

        provide('SelectMode' ,selectMode)
        provide('EventBus' ,{$on ,$emit})

        $on('itemClick' ,()=>{
            if (selectMode.props.multiple != undefined){
                nextTick(()=>{
                    selectMode.adjustWH()
                })
            }else{
                selectMode.inputRef.value.val(selectMode.rctData.sData[0].label)
                selectMode.popoverRef.value.hide()
            }
        })

        onMounted(()=>{
            selectMode.rctData.dropdownWidth = selectMode.selectRef.value.clientWidth - 2

            if (props.disabled != undefined){
                selectMode.inputRef.value.disabled()
                selectMode.popoverRef.value.disabled()
            }

        })

        return {selectMode ,computeClass ,computePlaceholder}
    }
})
</script>

<style lang="" scoped></style>
