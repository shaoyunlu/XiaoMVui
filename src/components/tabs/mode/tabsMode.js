import { reactive, ref, watch } from "vue"

class TabsMode{
    constructor(options){
        this.rctData = reactive({
            itemList : []
        })
        this.ctx
        this.$on
        this.$emit
        this.$remove
        this.tabPosition = options.tabPosition
        this.editable = options.editable
        this.barRef = ref(null)
        this.tabsNavRef = ref(null)
        this.tabsNavScrollRef = ref(null)
        this.isScrollable = ref(false)
        this.barTranslateX = ref(0)
        this.barTranslateY = ref(0)
        this.barWidth = ref(0)
        this.barHeight = ref(0)
        this.currentOffsetLeft = 0
    }

    remove(name){
        this.rctData.itemList = this.rctData.itemList.filter(node=>{
            return node.name != name
        })

    }
}

export default TabsMode