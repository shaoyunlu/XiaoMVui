import { reactive } from "vue";

class SelectMode{
    constructor(){
        this.rctData = reactive({
            options : []
        })
    }
}

export default SelectMode