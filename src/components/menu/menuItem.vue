<template>
    <li class="xmv-menu-item" :class="{'is-active':node.active}" @click.stop="handleClick">

        <i class="xmv-icon-code" v-if="!menuMode.rctMenu.isCollapse"></i>
        <span v-if="!menuMode.rctMenu.isCollapse">{{node.name}}</span>

        <xmv-tooltip v-if="menuMode.rctMenu.isCollapse" placement="right" :content="node.name">
            <div class="xmv-menu-tooltip__trigger" v-if="level = 1">
                <i class="xmv-icon-code"></i>
            </div>
        </xmv-tooltip>
        
    </li>
</template>

<script>
import {defineComponent,inject} from 'vue'
export default defineComponent({
    name:"",
    props:{
        node:Object
    },
    setup(props ,context) {

        const menuMode = inject('MenuMode')
        const level = inject('Level')

        const handleClick = ()=>{
            menuMode.itemClick(props.node)
        }

        return {
            handleClick,menuMode,level
        }
    }
})
</script>

<style lang="less">
    
</style>