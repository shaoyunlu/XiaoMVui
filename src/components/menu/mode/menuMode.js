import { reactive } from "vue"
import {getHiddenDomWH} from 'utils/dom'
import {expand ,close} from 'utils/animate'
import {collapseAnimate ,expandAnimate} from './menuAnimate'
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

        collapseAnimate(this.menuElRef.value ,()=>{
            this.rctMenu.isCollapse = true
            this.rctMenu.data.forEach(node =>{
                node.childNodesVisible = false
            })
        })

    }

    expand(){
        expandAnimate(this.menuElRef.value ,()=>{
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
            close(subXmvMenuEl ,domHeight ,cbf)
        }else{
            expand(subXmvMenuEl ,domHeight ,cbf)
        }
    }
}

export default MenuMode