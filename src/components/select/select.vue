<template>
    <xmv-popover placement="bottom" :ref="selectMode.popoverRef">
        <template #trigger>
            <div class="xmv-select" :ref="selectMode.selectRef">
                <div class="select-trigger">
                    <xmv-input placeholder="请选择" suffixicon="arrowDown" :ref="selectMode.inputRef"></xmv-input>
                </div>
            </div>
        </template>
        <div class="xmv-select-dropdown" 
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
import {defineComponent, onMounted, provide, reactive} from 'vue'
import SelectMode from './mode/selectMode'
import xmvSelectItem from './item.vue'
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvSelect",
    components:{xmvSelectItem},
    setup(props ,context) {

        const selectMode = new SelectMode()

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        provide('SelectMode' ,selectMode)
        provide('EventBus' ,{$on ,$emit})

        $on('itemClick' ,data=>{
            selectMode.popoverRef.value.hide()
            selectMode.inputRef.value.val(data.label)
        })

        onMounted(()=>{
            selectMode.rctData.dropdownWidth = selectMode.selectRef.value.clientWidth - 2
        })

        return {selectMode}
    }
})
</script>

<style lang="" scoped></style>
