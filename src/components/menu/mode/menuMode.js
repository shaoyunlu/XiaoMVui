import { nextTick, reactive } from "vue"
import {getHiddenDomWH} from 'utils/dom'
import {addClass,removeClass,hasClass} from 'utils/dom'
import XmvTransition from 'comps/transition/transition'
class MenuMode{

    constructor(){
        this.rctMenu = reactive({
            data : [],
            isCollapse : true
        })

        this.menuElRef = null
        this.curSelNode = null
        this.transition = new XmvTransition()
    }

    init(){

    }

    loadData(data){
        this.rctMenu.data = data
    }

    collapse(){
        if (this.rctMenu.isCollapse){
            return false
        }
        let expandWidthStr = this.__getExpandWidth()
        this.transition.widthCollapse(this.menuElRef.value,
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
        if (!this.rctMenu.isCollapse){
            return false
        }
        let expandWidthStr = this.__getExpandWidth()
        this.transition.widthExpand(this.menuElRef.value,
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
            this.transition.heightCollapse(subXmvMenuEl ,domHeight + 'px' ,0 ,cbf)
        }else{
            this.transition.heightExpand(subXmvMenuEl ,domHeight + 'px' ,0 ,cbf)
        }
    }

    onMounted(){
        nextTick(()=>{
            console.log(this.curSelNode)
        })
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