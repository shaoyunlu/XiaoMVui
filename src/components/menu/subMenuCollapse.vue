<template>
    <li class="xmv-sub-menu" @mouseover="handleMouseover">
        <xmv-popover ref="popoverRef" :needUpdate=true>
            <template #trigger>
                <div class="xmv-sub-menu__title">
                    <i class="xmv-icon-code" v-if="level == 1"></i>
                    <span>{{node.name}}</span>
                </div>
            </template>

            <ul class="xmv-menu"  ref="subXmvMenuRef"
                :style="{'--xmv-menu-level':level}">
                <xmv-menu-core-collapse v-for="child in node.childNodes" :node="child"></xmv-menu-core-collapse>
            </ul>
        </xmv-popover>
    </li>
</template>

<script>
import {defineComponent, inject, onMounted, ref ,watch} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup(props ,context) {
        const level = inject('Level')
        const menuMode = inject('MenuMode')
        const subXmvMenuRef = ref(null)
        const popoverRef = ref(null)

        const handleMouseover = ()=>{
            console.log()
        }


        onMounted(()=>{
            // 需要给popover重新定位
        })

        return {
            subXmvMenuRef,level,menuMode,popoverRef,handleMouseover
        }
    }
})
</script>

<style lang="less">
    
</style>