<template>
    <xmv-popover placement="bottom">
        <template #trigger>
            <xmv-input prefixicon="calendar" clearable></xmv-input>
        </template>
    </xmv-popover>
    <div class="xmv-picker-panel xmv-date-picker">
        <div class="xmv-picker-panel__body-wrapper">
            <div class="xmv-picker-panel__body">
                <xmv-calendar></xmv-calendar>
            </div>
        </div>
        <div class="xmv-picker-panel__footer"></div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import DatePickerMode from './mode/datePickerMode'
import xmvCalendar from './calendar.vue'
export default defineComponent({
    name:"xmvDatePicker",
    components:{xmvCalendar},
    props:{

    },
    setup(props ,context) {
        const datePickerMode = new DatePickerMode(props)
        return {datePickerMode}
    }
})
</script>

<style lang="" scoped></style>
