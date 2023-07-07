<template>

    <xmv-popover>
        <template #trigger>
            <div class="xmv-cascader">
                <xmv-input suffixicon="arrowDown"></xmv-input>
            </div>
        </template>

        <div class="xmv-cascader-panel">
            <xmv-cascader-menu v-for="tmp,index in cascaderMode.rctData.menuComps" 
                :list="tmp.list" :index="index"></xmv-cascader-menu>
        </div>

    </xmv-popover>

    
</template>

<script>
import {defineComponent, nextTick, onMounted, provide, watch} from 'vue'
import xmvCascaderMenu from './cascaderMenu.vue'
import CascaderMode from './mode/cascaderMode'
export default defineComponent({
    name:"xmvCascader",
    components:{xmvCascaderMenu},
    props:{
        options : Array
    },
    setup(props ,context) {

        const cascaderMode = new CascaderMode()

        provide('CascaderMode' ,cascaderMode)

        watch(()=>props.options ,(newVal)=>{
            cascaderMode.rctData.menuComps = []
            cascaderMode.rctData.options = {children : props.options}
            nextTick(()=>{
                cascaderMode.init()
            })
        })

        onMounted(()=>{
            cascaderMode.rctData.options = {children : props.options}
            cascaderMode.init()
        })

        return {cascaderMode}
    }
})
</script>

<style lang="" scoped></style>
