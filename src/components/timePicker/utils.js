export function coverNum(val){
    if (val < 10){
        return '0' + parseInt(val)
    }
    return val
}