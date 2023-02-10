import { reactive } from "vue"
import {getHiddenDomWH} from 'utils/dom'
import {collapse as widthCollapse ,expand as widthExpand} from 'comps/transition/widthCollapseExpand'
import {collapse as heightCollapse ,expand as heightExpand} from 'comps/transition/heightCollapseExpand'
import {addClass,removeClass,hasClass} from 'utils/dom'
class MenuMode{

    constructor(){
        this.rctMenu = reactive({
            data : [],
            isCollapse : false
        })

        this.menuElRef = null
        this.curSelNode = null
    }

    init(){

    }

    loadData(data){
        this.rctMenu.data = data
    }

    collapse(){
        let expandWidthStr = this.__getExpandWidth()
        widthCollapse(this.menuElRef.value,
            expandWidthStr,
            'calc(var(--xmv-menu-icon-width) + var(--xmv-menu-base-level-padding) * 2)',
            ()=>{
                this.rctMenu.isCollapse = true
                this.rctMenu.data.forEach(node =>{
                    node.childNodesVisible = false
                })
        })
    }

    expand(){
        let expandWidthStr = this.__getExpandWidth()
        widthExpand(this.menuElRef.value,
            expandWidthStr,
            'calc(var(--xmv-menu-icon-width) + var(--xmv-menu-base-level-padding) * 2)',
            ()=>{
                this.rctMenu.isCollapse = false
        })
    }

    itemClick(node){
        if (this.curSelNode){
            this.curSelNode.active = false
        }
        node.active = !node.active
        this.curSelNode = node
    }

    subClick(node ,subXmvMenuEl){
        if (this.rctMenu.isCollapse){
            return false
        }
        let {domHeight} = getHiddenDomWH(subXmvMenuEl)
        const cbf = ()=>{
            node.childNodesVisible = !node.childNodesVisible
        }

        if (node.childNodesVisible){
            heightCollapse(subXmvMenuEl ,domHeight + 'px' ,0 ,cbf)
        }else{
            heightExpand(subXmvMenuEl ,domHeight + 'px' ,0 ,cbf)
        }
    }

    __getExpandWidth(){
        let expandWidth
        if (hasClass(this.menuElRef.value,'xmv-menu--collapse')){
            removeClass(this.menuElRef.value,'xmv-menu--collapse')
            expandWidth = this.menuElRef.value.scrollWidth
            addClass(this.menuElRef.value,'xmv-menu--collapse')
        }else{
            expandWidth = this.menuElRef.value.scrollWidth
        }
        
        return expandWidth + 'px'
    }
}

export default MenuMode