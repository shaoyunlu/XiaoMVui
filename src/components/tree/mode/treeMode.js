import { reactive } from "vue"
import {getHiddenDomWH} from 'utils/dom'
import {isEmpty} from 'utils/data'
import XmvTransition from 'comps/transition/transition'
class TreeMode{
    constructor(props){
        this.rctData = reactive({
            data : []
        })
        this.transition = new XmvTransition()
        this.filterNodeMethod = props.filterNodeMethod
    }

    loadData(data){
        this.rctData.data = data
    }

    filter(label){
        this.rctData.data.forEach(node =>{
            __filter(node ,label)
        })

        function __filter(node ,label){
            __compare(node ,label)
            if (!isEmpty(node.children)){
                node.children.forEach(tmpNode =>{
                    __filter(tmpNode ,label)
                })
            }
        }

        function __compare(node ,label){
            if (node.label.includes(label)){
                while(node){
                    node.isHidden = false
                    node = node.parent
                }
            }else{
                node.isHidden = true
            }
        }
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

    handleNodeCheck(node){
        if (isEmpty(node.children)){

        }else{
            // 所有子节点都跟着变
            this.__handleChildrenNodeCheck(node ,node.isChecked)
        }

        // 需要改变父节点
        this.__handleParentNodeCheck(node)

    }

    __handleParentNodeCheck(node){
        if (!node.parent){
            return false
        }
        let pNode = node.parent
        this.__calcNodeStatus(pNode)
        this.__handleParentNodeCheck(pNode)
    }

    __handleChildrenNodeCheck(cNode ,isChecked){
        cNode.isChecked = isChecked
        if (isEmpty(cNode.children)){
            return false
        }
        cNode.children.forEach(childNode =>{
            this.__handleChildrenNodeCheck(childNode ,isChecked)
        })
    }

    __calcNodeStatus(node){
        let hasChecked = false
        let hasNoChecked = false

        function loop(cNode){
            if (isEmpty(cNode.children)){
                return false
            }
            cNode.children.forEach(tmp=>{
                if (tmp.isChecked){
                    hasChecked = true
                }else{
                    hasNoChecked = true
                }
                loop(tmp)
            })
        }
        loop(node)

        // 全选
        if (hasChecked && !hasNoChecked){
            node.isChecked = true
            node.isIndeterminate = false
        }
        // 部分选
        else if (hasChecked && hasNoChecked){
            node.isChecked = false
            node.isIndeterminate = true
        }
        else if (!hasChecked && hasNoChecked){
            node.isChecked = false
            node.isIndeterminate = false
        }

    }
}

export default TreeMode