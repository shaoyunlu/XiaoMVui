import { reactive } from "vue"
import {getHiddenDomWH} from 'utils/dom'
import {isEmpty} from 'utils/data'
import XmvTransition from 'comps/transition/transition'
class TreeMode{
    constructor(){
        this.rctData = reactive({
            data : []
        })
        this.transition = new XmvTransition()
    }

    loadData(data){
        this.rctData.data = data
    }

    handleNodeClick(node ,subRef){
        if (!isEmpty(node.children)){
            let childrenEl = subRef.value.childrenDivRef
            let {domHeight} = getHiddenDomWH(childrenEl)
            
            node.iconExpanded = !node.iconExpanded

            const cbf = ()=>{
                node.isExpanded = !node.isExpanded
            }

            if (node.isExpanded){
                this.transition.heightCollapse(childrenEl ,domHeight + 'px' ,0 ,cbf)
            }else{
                this.transition.heightExpand(childrenEl ,domHeight + 'px' ,0 ,cbf)
            }
        }
    }
}

export default TreeMode