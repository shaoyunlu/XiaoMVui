<template>
    <div class="xmv-picker-panel__content">
        <div class="xmv-date-picker__header">
            <span class="xmv-date-picker__prev-btn">
                <button type="button" class="d-arrow-left xmv-picker-panel__icon-btn">
                    <xmv-icon name="dArrowLeft"></xmv-icon>
                </button>
                <button type="button" class="xmv-picker-panel__icon-btn arrow-left">
                    <xmv-icon name="arrowLeft"></xmv-icon>
                </button>
            </span>
            <span role="button" class="xmv-date-picker__header-label">2023 </span>
            <span role="button" class="xmv-date-picker__header-label">April</span>
            <span class="xmv-date-picker__next-btn">
                <button type="button" class="xmv-picker-panel__icon-btn arrow-right">
                    <xmv-icon name="arrowRight"></xmv-icon>
                </button>
                <button type="button" class="xmv-picker-panel__icon-btn d-arrow-right">
                    <xmv-icon name="dArrowRight"></xmv-icon>
                </button>
            </span>
        </div>
        <div class="xmv-picker-panel__content">
            <table class="xmv-date-table">
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
