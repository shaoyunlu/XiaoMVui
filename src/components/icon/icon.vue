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
import circleClose from './category/circleClose.vue'
import vew from './category/view.vue'
import hide from './category/hide.vue'
import calendar from './category/calendar.vue'
export default defineComponent({
    name:"xmvIcon",
    components:{plus ,minus ,search ,close ,arrowLeft ,arrowRight ,
                dArrowLeft ,dArrowRight,arrowDown ,loading ,check ,
                edit ,dlt ,sort ,setting ,refresh ,circleClose ,vew ,hide ,calendar},
    props:{
        name : ''
    },
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
