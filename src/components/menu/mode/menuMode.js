import { reactive } from "vue"

class MenuMode{

    constructor(){
        this.rctMenuData = reactive({
            data : []
        })
    }

    init(){

    }

    loadData(data){
        this.rctMenuData.data = data
    }

    itemClick(node){
        // 当前节点选中
        node.active = true
    }

    subClick(node){
        node.childNodesVisible = !node.childNodesVisible
    }
}

export default MenuMode