<template>
    <xmv-popover placement="bottom">
        <template #trigger>
            <div class="xmv-select">
                <div class="select-trigger">
                    <xmv-input placeholder="请选择" suffixicon="arrowDown"></xmv-input>
                </div>
            </div>
        </template>
        <div class="xmv-select-dropdown">
            <xmv-scrollbar>
                <ul class="xmv-select-dropdown__list">
                    <li v-for="tmp in selectMode.rctData.options" class="xmv-select-dropdown__item">
                        <span>{{tmp.label}}</span>
                    </li>
                </ul>
            </xmv-scrollbar>
        </div>
    </xmv-popover>
    <slot></slot>
</template>

<script>
import {defineComponent, provide} from 'vue'
import SelectMode from './mode/selectMode'
export default defineComponent({
    name:"xmvSelect",
    setup(props ,context) {

        const selectMode = new SelectMode()

        provide('SelectMode' ,selectMode)

        return {selectMode}
    }
})
</script>

<style lang="" scoped></style>
