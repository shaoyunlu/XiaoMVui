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
import arrowRight from './category/arrowRight.vue'
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
export default defineComponent({
    name:"xmvIcon",
    components:{plus ,minus ,search ,close ,arrowRight ,loading ,check ,
                edit ,dlt ,sort ,setting ,refresh ,circleClose ,vew ,hide},
    props:{
        name : ''
    },
    setup(props ,context) {
        return {}
    }
})
</script>

<style lang="" scoped></style>
