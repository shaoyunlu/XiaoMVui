<template>
    <i class="xmv-icon">
        <component :is="name" v-if="typeof name == 'string'"></component>
        <component :is="tRaw(name)" v-else></component>
    </i>
</template>

<script>
import {defineComponent, onMounted, toRaw} from 'vue'
import arrowDown from './category/arrowDown.vue'
import arrowLeft from './category/arrowLeft.vue'
import arrowRight from './category/arrowRight.vue'
import arrowUp from './category/arrowUp.vue'
import barChart from './category/barChart.vue'
import check from './category/check.vue'
import close from './category/close.vue'
import circleCheck from './category/circleCheck.vue'
import circleClose from './category/circleClose.vue'
import calendar from './category/calendar.vue'
import clock from './category/clock.vue'
import document from './category/document.vue'
import dArrowLeft from './category/dArrowLeft.vue'
import dArrowRight from './category/dArrowRight.vue'
import dlt from './category/delete.vue'
import download from './category/download.vue'
import edit from './category/edit.vue'
import empty from './category/empty.vue'
import hide from './category/hide.vue'
import infoFilled from './category/infoFilled.vue'
import loading from './category/loading.vue'
import lineChart from './category/lineChart.vue'
import moreFilled from './category/moreFilled.vue'
import message from './category/message.vue'
import minus from './category/minus.vue'
import pieChart from './category/pieChart.vue'
import plus from './category/plus.vue'
import refresh from './category/refresh.vue'
import search from './category/search.vue'
import sort from './category/sort.vue'
import setting from './category/setting.vue'
import star from './category/star.vue'
import successFilled from './category/successFilled.vue'
import upload from './category/upload.vue'
import uploadFilled from './category/uploadFilled.vue'
import vew from './category/view.vue'
import warningFilled from './category/warningFilled.vue'
import zoomIn from './category/zoomIn.vue'
import zoomOut from './category/zoomOut.vue'
export default defineComponent({
    name:"xmvIcon",
    components:{
                plus ,minus ,search ,close ,arrowLeft ,arrowRight ,arrowUp ,
                dArrowLeft ,dArrowRight,arrowDown ,loading ,check ,
                edit ,empty ,dlt ,sort ,setting ,refresh ,circleClose ,circleCheck ,
                vew ,hide ,calendar ,clock,upload,uploadFilled,download,infoFilled,successFilled,
                warningFilled,moreFilled,document,zoomIn,zoomOut,message,star,
                pieChart,lineChart,barChart
              },
    props:{
        name : String | Object,
        icon : Object
    },
    setup(props ,context) {

        const oriIcon = toRaw(props.icon)

        const tRaw = (val)=>{
            return toRaw(val)
        }

        return {oriIcon ,tRaw}
    }
})
</script>

<style lang="" scoped></style>
