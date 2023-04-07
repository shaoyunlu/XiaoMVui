import {reactive} from 'vue'
import {resizeOB} from 'utils/event'

class TableMode{

    constructor(opt){
        this.rctData = reactive({
            header : [],
            data : [],
            tableWidth : ''
        })
        this.option = opt
        this.automatic
        this.parentEl
        this.tableRef
    }

    init(){
        this.__setAutomatic()
        this.layout()
    }

    layout(){
        let self = this
        if (this.automatic){
            this.parentEl = this.tableRef.value.parentNode
            this.__handleAutomatic()
            resizeOB(self.parentEl ,()=>{
                self.__handleAutomatic()
            })
        }else{
            this.__handleFixed()
        }
    }

    __setAutomatic(){
        const header = this.rctData.header
        let flag = false
        header.forEach(tmp => {
            if (!tmp.width){
                tmp.automatic = true
                flag = true
            }
        })
        this.automatic = flag
    }

    __handleAutomatic(){
        // 根据父元素的宽度，重新分配各个col
        let parentNodeWidth = this.parentEl.clientWidth
        const header = this.rctData.header

        const hasWidthArray = header.filter(tmp=>{return !tmp.automatic})
        const noWidthArray = header.filter(tmp =>{return tmp.automatic})

        let hasWidthTotal = 0
        hasWidthArray.forEach(tmp =>{
            hasWidthTotal += parseInt(tmp.width)
        })

        let stillWidth = parentNodeWidth - hasWidthTotal
        let unitWidth = stillWidth/noWidthArray.length
        if (unitWidth <= 100){
            unitWidth = 100
        }

        noWidthArray.forEach(tmp => {
            tmp.width = unitWidth
        })

        this.__handleFixed()
    }

    __handleFixed(){
        const header = this.rctData.header
        let resWidth = 0
        header.forEach(tmp =>{
            let width
            if (tmp.width){
                width = parseInt(tmp.width)
            }
            resWidth += width
        })
        this.rctData.tableWidth = resWidth
    }

}

export default TableMode