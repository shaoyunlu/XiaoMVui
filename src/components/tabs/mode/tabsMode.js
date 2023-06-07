import { reactive, ref } from "vue"

class TabsMode{
    constructor(options){
        this.rctData = reactive({
            itemList : []
        })
        this.$on
        this.$emit
        this.tabPosition = options.tabPosition
        this.barRef = ref(null)
        this.barTranslate = ref(0)
        this.barWidth = ref(0)
        this.currentOffsetLeft = 0
    }
}

export default TabsMode