import { reactive } from "vue"

class CascaderMode{
    constructor(){
        this.rctData = reactive({
            options : new Object(),
            menuComps : []
        })
        this.currentList
    }

    init(){
        this.rctData.menuComps.push({list : this.rctData.options.children})
    }

}

export default CascaderMode