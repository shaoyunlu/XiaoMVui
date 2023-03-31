<template>
    <li class="xmv-sub-menu" @mouseover="handleMouseover" @mouseleave="handleMouseleave">
        <xmv-popover placement="bottom" :beStripped="level == 1?true:false"
                ref="popoverRef"   @mouseleave="handlePopML"  @mouseover="handlePopMO" :needUpdate=true>
            <template #trigger>
                <div class="xmv-sub-menu__title">
                    <span>{{node.name}}</span>
                    <i class="xmv-icon xmv-sub-menu__icon-arrow" :class="{'active' : isActive}">
                        
                    </i>
                </div>
            </template>

            <ul class="xmv-menu"  ref="subXmvMenuRef"
                :style="{'--xmv-menu-level':level}">
                <xmv-menu-core-horizontal v-for="child in node.childNodes" :node="child"></xmv-menu-core-horizontal>
            </ul>
        </xmv-popover>
    </li>
</template>

<script>
import {defineComponent, inject, nextTick, onMounted, ref ,watch} from 'vue'
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
        const isActive = ref(false)

        const handleMouseover = (e)=>{
            popoverRef.value.show()
        }

        const handleMouseleave = (e)=>{
            popoverRef.value.hide()
        }

        const handlePopML = ()=>{
            isActive.value = false
        }

        const handlePopMO = ()=>{
            isActive.value = true
        }

        return {
            subXmvMenuRef,level,menuMode,popoverRef,
            handleMouseover,handleMouseleave,handlePopML,handlePopMO,isActive
        }
    }
})
</script>

<style lang="less">
    
</style>