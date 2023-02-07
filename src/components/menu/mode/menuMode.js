import { reactive } from "vue"
import {getHiddenDomHeight} from 'utils/dom'
import {expand ,close} from 'utils/animate'
class MenuMode{

    constructor(){
        this.rctMenu = reactive({
            data : []
        })
    }

    init(){

    }

    loadData(data){
        this.rctMenu.data = data
    }

    itemClick(node){
        // 当前节点选中
        node.active = true
    }

    subClick(node ,subXmvMenuEl){
        
        let subXmvMenuElHeight = getHiddenDomHeight(subXmvMenuEl)

        const cbf = ()=>{
            node.childNodesVisible = !node.childNodesVisible
        }

        if (node.childNodesVisible){
            close(subXmvMenuEl ,subXmvMenuElHeight ,cbf)
        }else{
            expand(subXmvMenuEl ,subXmvMenuElHeight ,cbf)
        }

        

    }
}

export default MenuMode