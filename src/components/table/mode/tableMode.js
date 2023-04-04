import {reactive} from 'vue'

class TableMode{

    constructor(opt){
        this.rctData = reactive({
            header : opt.header,
            data : []
        })
    }

}

export default TableMode