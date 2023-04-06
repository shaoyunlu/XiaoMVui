import {reactive} from 'vue'

class TableMode{

    constructor(opt){
        this.rctData = reactive({
            header : [],
            data : [],
            tableWidth : ''
        })
        this.option = opt
    }

    automatic(){
        if (this.option.automatic){
            this.__handleAutomatic()
        }else{
            this.__handleFixed()
        }
    }

    __handleAutomatic(){
        // 根据父元素的宽度，重新分配各个col
    }

    __handleFixed(){
        const header = this.rctData.header
        let resWidth = 0
        header.forEach(tmp =>{
            let width
            if (tmp.width){
                width = parseInt(tmp.width)
            }else{
                width = 200
            }
            resWidth += width
        })
        this.rctData.tableWidth = resWidth
    }

}

export default TableMode