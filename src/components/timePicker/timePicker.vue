<template>
    <xmv-popover>
        <template #trigger>
            <xmv-input class="xmv-date-editor xmv-date-editor--time" prefixicon="clock" clearable></xmv-input>
        </template>
    </xmv-popover>
    <div class="xmv-time-panel">
        <div class="xmv-time-panel__content has-seconds">
            <div class="xmv-time-spinner has-seconds">
                <xmv-time-hour></xmv-time-hour>
                <xmv-time-minute></xmv-time-minute>
                <xmv-time-second></xmv-time-second>
            </div>
        </div>
        <div class="xmv-time-panel__footer"></div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import xmvTimeHour from './hour.vue'
import xmvTimeMinute from './minute.vue'
import xmvTimeSecond from './second.vue'
export default defineComponent({
    name:"xmvTimePicker",
    components:{xmvTimeHour ,xmvTimeMinute ,xmvTimeSecond},
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
