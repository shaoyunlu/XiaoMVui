import { reactive } from "vue"
import {getHiddenDomHeight} from 'utils/dom'
import {expand ,close} from 'utils/animate'
class MenuMode{

    constructor(){
        this.rctMenu = reactive({
            data : [],
            isCollapse : false
        })

        this.curSelNode = null
    }

    init(){

    }

    loadData(data){
        this.rctMenu.data = data
    }

    collapse(){
        this.rctMenu.isCollapse = true
    }

    expand(){
        this.rctMenu.isCollapse = false
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
        let {domHeight} = getHiddenDomHeight(subXmvMenuEl)
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