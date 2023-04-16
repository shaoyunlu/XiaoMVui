import { reactive, ref } from "vue";

class SelectMode{
    constructor(){
        this.rctData = reactive({
            options : [],
            dropdownWidth : 0
        })
        this.selectRef = ref(null)
        this.inputRef = ref(null)
        this.popoverRef = ref(null)
    }
}

export default SelectMode