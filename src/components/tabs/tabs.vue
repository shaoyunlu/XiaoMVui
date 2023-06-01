<template>
    <div class="xmv-tabs" :class="computeTabsClass">
        <div class="xmv-tabs__header" :class="computePositionClass">
            <div class="xmv-tabs__nav-wrap" :class="computePositionClass">
                <div class="xmv-tabs__nav-scroll">
                    <div class="xmv-tabs__nav" :class="computePositionClass">
                        <div class="xmv-tabs__active-bar" 
                            :ref="tabsMode.barRef" 
                            :class="computePositionClass"
                            :style="{width:tabsMode.barWidth.value + 'px',transform:'translateX('+tabsMode.barTranslate.value+'px)'}"></div>
                        <xmv-tabs-item v-for="(tmp,index) in tabsMode.rctData.itemList" :data="tmp" :index="index"></xmv-tabs-item>
                    </div>
                </div>
            </div>
        </div>
        <div class="xmv-tabs__content">
            <xmv-tabs-content v-for="tmp in tabsMode.rctData.itemList" :data="tmp"></xmv-tabs-content>
        </div>
    </div>
    <slot></slot>
</template>

<script>
import {computed, defineComponent, nextTick, onMounted, provide ,reactive} from 'vue'
import TabsMode from './mode/tabsMode'
import xmvTabsItem from './item.vue';
import xmvTabsContent from './content.vue';
import {createEventBus} from 'utils/event'
export default defineComponent({
    name:"xmvTabs",
    props:{
        tabPosition : {type:String ,default:'top'}
    },
    emits:['buildDone'],
    components:{xmvTabsItem ,xmvTabsContent},
    setup(props ,context) {

        const eventBus = reactive({
            listeners : {}
        })

        const {$on ,$emit} = createEventBus(eventBus)

        const computeTabsClass = computed(()=>{
            return ['xmv-tabs--' + props.tabPosition]
        })

        const computePositionClass = computed(()=>{
            return ['is-' + props.tabPosition]
        })

        const tabsMode = new TabsMode(props)

        tabsMode.$on = $on
        tabsMode.$emit = $emit

        provide('TabsMode' ,tabsMode)

        onMounted(()=>{
            nextTick(()=>{
                tabsMode.$emit('setActive')
                context.emit('buildDone')
            }) 
        })

        return {tabsMode ,computeTabsClass ,computePositionClass}
    }
})
</script>

<style lang="" scoped></style>
