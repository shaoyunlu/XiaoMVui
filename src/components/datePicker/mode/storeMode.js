class StoreMode{
    constructor(){
        this.leftDMode = null
        this.rightDMode = null
        this.dateObj = new Object()
        this.dateList = []
    }

    handleList(dateObj){
        if (this.dateList.length == 2){
            return false
        }
        this.dateList.push(dateObj)
    }

}

export default StoreMode