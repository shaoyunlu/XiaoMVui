<template>
    <i class="xmv-icon">
        <component :is="name"></component>
    </i>
</template>

<script>
import {defineComponent} from 'vue'
import plus from './category/plus.vue'
import minus from './category/minus.vue'
import search from './category/search.vue'
import close from './category/close.vue'
import arrowLeft from './category/arrowLeft.vue'
import arrowRight from './category/arrowRight.vue'
import dArrowLeft from './category/dArrowLeft.vue'
import dArrowRight from './category/dArrowRight.vue'
import arrowDown from './category/arrowDown.vue'
import loading from './category/loading.vue'
import check from './category/check.vue'
import edit from './category/edit.vue'
import dlt from './category/delete.vue'
import sort from './category/sort.vue'
import setting from './category/setting.vue'
import refresh from './category/refresh.vue'
import circleCheck from './category/circleCheck.vue'
import circleClose from './category/circleClose.vue'
import vew from './category/view.vue'
import hide from './category/hide.vue'
import calendar from './category/calendar.vue'
import clock from './category/clock.vue'
import upload from './category/upload.vue'
import download from './category/download.vue'
import infoFilled from './category/infoFilled.vue'
import successFilled from './category/successFilled.vue'
import warningFilled from './category/warningFilled.vue'
import moreFilled from './category/moreFilled.vue'
import document from './category/document.vue'
import zoomIn from './category/zoomIn.vue'
import zoomOut from './category/zoomOut.vue'
export default defineComponent({
    name:"xmvIcon",
    components:{plus ,minus ,search ,close ,arrowLeft ,arrowRight ,
                dArrowLeft ,dArrowRight,arrowDown ,loading ,check ,
                edit ,dlt ,sort ,setting ,refresh ,circleClose ,circleCheck ,vew ,hide ,calendar ,clock,
            upload,download,infoFilled,successFilled,warningFilled,moreFilled,document,zoomIn,zoomOut},
    props:{
        name : ''
    },
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
