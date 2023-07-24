import { reactive ,ref} from "vue"
import {getHiddenDomWH} from 'utils/dom'
import {isEmpty ,deleteObjectByKey ,deleteObjectFromArray} from 'utils/data'
import XmvTransition from 'comps/transition/transition'
class TreeMode{
    constructor(props){
        this.rctData = reactive({
            data : [],
            sData : []
        })
        this.transition = new XmvTransition()
        this.filterNodeMethod = props.filterNodeMethod
        this.showCheckbox = props.showCheckbox
        this.notAssociated = props.notAssociated
        this.$on = null
        this.$emit = null
        this.dropIndicatorTop = ref(0)
        this.dropIndicatorLeft = ref(0)
        this.dropIndicatorDisplay = ref(false)
        this.currentDragNode = null
        this.currentDropEnterNode = null
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

    handleNodeClick(node){
        // 如果是单选模式，要有选中模式
        if (this.showCheckbox != undefined){
            return false
        }
        this.$emit('nodeClick' ,node)
    }

    handleExpandIconClick(node ,subRef){
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
        if (this.notAssociated != undefined){

        }
        else{
            if (isEmpty(node.children)){

            }else{
                // 所有子节点都跟着变
                this.__handleChildrenNodeCheck(node ,node.isChecked)
            }
    
            // 需要改变父节点
            this.__handleParentNodeCheck(node)
        }

        this.$emit('nodeCheck' ,this.getCheckedNode())

    }

    getCheckedNode(){
        var self = this
        this.rctData.sData = []
        this.rctData.data.forEach(node =>{
            loop(node)
        })

        function loop(node){
            if (node.isChecked){
                self.rctData.sData.push(node)
            }
            if (isEmpty(node.children)){
                return false
            }
            node.children.forEach(tmp =>{
                loop(tmp)
            })
        }

        return this.rctData.sData

    }

    findNodeByParam(nestedArray, value ,type = 'value'){
        for (let item of nestedArray) {
            if (item[type] === value) {
              return item;
            }
        
            if (item.children && item.children.length > 0) {
              let found = this.findNodeByParam(item.children, value ,type);
              if (found) {
                return found;
              }
            }
          }
        
          return null;
    }

    findParents(nestedArray, value, parents = [] ,type = 'value') {
        for (let item of nestedArray) {
          if (item[type] === value) {
            return parents;
          }
      
          if (item.children && item.children.length > 0) {
            let newParents = parents.concat(item);
            let foundParents = this.findParents(item.children, value, newParents);
            if (foundParents) {
              return foundParents;
            }
          }
        }
        return null;
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
    
    insertNode(node){
        if (!node.children){
            node.children = []
        }
        deleteObjectFromArray('label' ,this.currentDragNode.label ,this.rctData.data)
        if (!node.children){
            node.children = []
        }
        node.children.push(this.currentDragNode)
    }

    beforeNode(){

    }

    afterNode(){

    }
}

export default TreeMode