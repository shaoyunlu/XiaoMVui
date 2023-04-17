import { reactive, ref } from "vue";

class SelectMode{
    constructor(props){
        this.rctData = reactive({
            options : [],
            sData : [],
            dropdownWidth : 0
        })
        this.selectRef = ref(null)
        this.inputRef = ref(null)
        this.popoverRef = ref(null)
        this.tagsRef
        this.props = reactive(props)
    }

    adjustWH(){
        // 调整input的高度
        let ht = this.tagsRef.value.clientHeight
        this.inputRef.value.inputRef.style.height = ht +'px'
        // 调整popover的位置
        this.popoverRef.value.setPosition()
    }
}

export default SelectMode