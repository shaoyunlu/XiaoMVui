<template>
    <ul class="xmv-menu">
        <xmv-menu-core v-for="child in menuMode.rctMenu.data" :node="child"></xmv-menu-core>
    </ul>
</template>

<script>
import {defineComponent, provide} from 'vue'
import MenuMode from './mode/menuMode'


export default defineComponent({
    name:"xmvMenu",

    setup(props ,context) {

        const menuMode = new MenuMode()

        const loadData = (menuData)=>{
            menuMode.loadData(menuData)
        }

        provide('MenuMode' ,menuMode)

        return {
            loadData,menuMode
        }
    }
})
</script>

<style lang="less">

    :root{
        --xmv-menu-text-color: #fff;
        --xmv-menu-hover-text-color: #fff;
        --xmv-menu-bg-color: #545c64;
        --xmv-menu-hover-bg-color: rgb(67, 74, 80);
        --xmv-menu-active-color: #ffd04b;
        --xmv-menu-level: 0;

        --xmv-menu-item-height: 56px;
        --xmv-menu-item-font-size: 14px;
        --xmv-menu-base-level-padding: 20px;
        --xmv-menu-icon-width: 24px;

    }

    .xmv-menu{
        border-right: solid 1px var(--xmv-menu-border-color);
        list-style: none;
        position: relative;
        margin: 0;
        padding-left: 0;
        background-color: var(--xmv-menu-bg-color);
        box-sizing: border-box;
    }

    .xmv-menu-item {
        display: flex;
        align-items: center;
        height: var(--xmv-menu-item-height);
        line-height: var(--xmv-menu-item-height);
        font-size: var(--xmv-menu-item-font-size);
        color: var(--xmv-menu-text-color);
        padding: 0 var(--xmv-menu-base-level-padding);
        list-style: none;
        cursor: pointer;
        position: relative;
        transition: border-color var(--xmv-transition-duration),background-color var(--xmv-transition-duration),color var(--xmv-transition-duration);
        box-sizing: border-box;
        white-space: nowrap;

        &:hover,&focus{
            outline: none;
            color: var(--xmv-menu-hover-text-color);
            background-color: var(--xmv-menu-hover-bg-color);
        }
    }

    .xmv-sub-menu {
        list-style: none;
        margin: 0;
        padding-left: 0;
    }

    .xmv-sub-menu__title {
        display: flex;
        align-items: center;
        height: var(--xmv-menu-item-height);
        line-height: var(--xmv-menu-item-height);
        font-size: var(--xmv-menu-item-font-size);
        color: var(--xmv-menu-text-color);
        padding: 0 var(--xmv-menu-base-level-padding);
        list-style: none;
        cursor: pointer;
        position: relative;
        transition: border-color var(--xmv-transition-duration),background-color var(--xmv-transition-duration),color var(--el-transition-duration);
        box-sizing: border-box;
        white-space: nowrap;
        padding-right: calc(var(--xmv-menu-base-level-padding) + var(--xmv-menu-icon-width));
    }

    
</style>